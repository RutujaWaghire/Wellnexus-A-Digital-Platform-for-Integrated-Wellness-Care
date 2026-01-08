import { useState, useEffect } from "react"; 
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, User, PenSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Review {
  id: string;
  user_id: string;
  user_name: string | null;
  product_id: string | null;
  therapist_name: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
}

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    therapist_name: "",
    rating: 5,
    comment: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .maybeSingle();
      setUserProfile(profile);
    }
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8);

    if (error) {
      console.error("Error fetching reviews:", error);
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  };

  const submitReview = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to write a review",
        variant: "destructive",
      });
      return;
    }

    if (!newReview.therapist_name.trim() || !newReview.comment.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        user_id: user.id,
        user_name: userProfile?.full_name || "Anonymous",
        therapist_name: newReview.therapist_name.trim(),
        rating: newReview.rating,
        comment: newReview.comment.trim(),
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: "Failed to submit review", variant: "destructive" });
    } else {
      setReviews([data, ...reviews]);
      setNewReview({ therapist_name: "", rating: 5, comment: "" });
      setIsDialogOpen(false);
      toast({ title: "Success", description: "Your review has been submitted!" });
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderStars = (rating: number, interactive = false, onRate?: (r: number) => void) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${interactive ? "cursor-pointer" : ""} ${
              star <= rating ? "fill-accent text-accent" : "text-muted-foreground"
            }`}
            onClick={() => interactive && onRate?.(star)}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section id="reviews" className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Community Reviews
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              See what our community says about their wellness experiences
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="wellness">
                <PenSquare className="h-5 w-5 mr-2" />
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Therapist or Product Name</label>
                  <Input
                    placeholder="e.g., Dr. Sarah Chen"
                    value={newReview.therapist_name}
                    onChange={(e) => setNewReview({ ...newReview, therapist_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-8 w-8 cursor-pointer transition-colors ${
                          star <= newReview.rating ? "fill-accent text-accent" : "text-muted-foreground hover:text-accent"
                        }`}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Review</label>
                  <Textarea
                    placeholder="Share your experience..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                  />
                </div>
                <Button variant="wellness" className="w-full" onClick={submitReview}>
                  Submit Review
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-2xl border border-border">
            <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="bg-card p-5 rounded-2xl border border-border hover:shadow-soft transition-all animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{review.user_name || "Anonymous"}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(review.created_at)}</p>
                  </div>
                </div>
                
                {review.therapist_name && (
                  <p className="text-xs font-medium text-primary mb-2">
                    Reviewed: {review.therapist_name}
                  </p>
                )}
                
                {renderStars(review.rating)}
                
                <p className="text-sm text-muted-foreground mt-3 line-clamp-4">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
