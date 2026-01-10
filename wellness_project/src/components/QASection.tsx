import { useState, useEffect } from "react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, ChevronDown, ChevronUp, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Question {
  id: string;
  user_id: string;
  user_name: string | null;
  title: string;
  content: string;
  category: string;
  created_at: string;
  answers?: Answer[];
}

interface Answer {
  id: string;
  question_id: string;
  user_id: string;
  user_name: string | null;
  content: string;
  is_accepted: boolean;
  created_at: string;
}

const categories = ["general", "therapy", "products", "wellness", "nutrition"];

const QASection = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "", category: "general" });
  const [newAnswer, setNewAnswer] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchQuestions();
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

  const fetchQuestions = async () => {
    const { data: questionsData, error } = await supabase
      .from("questions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching questions:", error);
    } else {
      // Fetch answers for all questions
      const questionIds = questionsData?.map(q => q.id) || [];
      const { data: answersData } = await supabase
        .from("answers")
        .select("*")
        .in("question_id", questionIds)
        .order("created_at", { ascending: true });

      const questionsWithAnswers = questionsData?.map(q => ({
        ...q,
        answers: answersData?.filter(a => a.question_id === q.id) || []
      })) || [];

      setQuestions(questionsWithAnswers);
    }
    setLoading(false);
  };

  const submitQuestion = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to ask questions",
        variant: "destructive",
      });
      return;
    }

    if (!newQuestion.title.trim() || !newQuestion.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await supabase
      .from("questions")
      .insert({
        user_id: user.id,
        user_name: userProfile?.full_name || "Anonymous",
        title: newQuestion.title.trim(),
        content: newQuestion.content.trim(),
        category: newQuestion.category,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: "Failed to post question", variant: "destructive" });
    } else {
      setQuestions([{ ...data, answers: [] }, ...questions]);
      setNewQuestion({ title: "", content: "", category: "general" });
      setIsDialogOpen(false);
      toast({ title: "Success", description: "Your question has been posted!" });
    }
  };

  const submitAnswer = async (questionId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to answer",
        variant: "destructive",
      });
      return;
    }

    const content = newAnswer[questionId];
    if (!content?.trim()) return;

    const { data, error } = await supabase
      .from("answers")
      .insert({
        question_id: questionId,
        user_id: user.id,
        user_name: userProfile?.full_name || "Anonymous",
        content: content.trim(),
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: "Failed to post answer", variant: "destructive" });
    } else {
      setQuestions(questions.map(q =>
        q.id === questionId
          ? { ...q, answers: [...(q.answers || []), data] }
          : q
      ));
      setNewAnswer({ ...newAnswer, [questionId]: "" });
      toast({ title: "Success", description: "Your answer has been posted!" });
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section id="qa" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-muted-foreground">Loading Q&A...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="qa" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Community Q&A
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Ask questions and share knowledge with our Wellnexus community
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="wellness">
                <MessageCircle className="h-5 w-5 mr-2" />
                Ask a Question
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ask a Question</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input
                  placeholder="Question title"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                />
                <Textarea
                  placeholder="Describe your question in detail..."
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                  rows={4}
                />
                <Select
                  value={newQuestion.category}
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="wellness" className="w-full" onClick={submitQuestion}>
                  Post Question
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {questions.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-2xl border border-border">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No questions yet. Be the first to ask!</p>
            </div>
          ) : (
            questions.map((question, index) => (
              <div
                key={question.id}
                className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className="p-5 cursor-pointer hover:bg-secondary/30 transition-colors"
                  onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <span className="text-xs font-medium text-primary bg-sage-light px-2 py-1 rounded-full">
                        {question.category}
                      </span>
                      <h3 className="font-semibold text-foreground mt-2">{question.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{question.content}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {question.user_name || "Anonymous"}
                        </span>
                        <span>{formatDate(question.created_at)}</span>
                        <span>{question.answers?.length || 0} answers</span>
                      </div>
                    </div>
                    {expandedQuestion === question.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {expandedQuestion === question.id && (
                  <div className="border-t border-border p-5 bg-secondary/20">
                    {/* Answers */}
                    <div className="space-y-4 mb-4">
                      {question.answers?.map((answer) => (
                        <div key={answer.id} className="bg-background p-4 rounded-xl">
                          <p className="text-sm text-foreground">{answer.content}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {answer.user_name || "Anonymous"}
                            </span>
                            <span>{formatDate(answer.created_at)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Answer Form */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Write your answer..."
                        value={newAnswer[question.id] || ""}
                        onChange={(e) => setNewAnswer({ ...newAnswer, [question.id]: e.target.value })}
                        onKeyDown={(e) => e.key === "Enter" && submitAnswer(question.id)}
                      />
                      <Button variant="wellness" size="icon" onClick={() => submitAnswer(question.id)}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default QASection;
