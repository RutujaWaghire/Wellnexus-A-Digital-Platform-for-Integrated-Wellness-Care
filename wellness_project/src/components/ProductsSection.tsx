import { useState, useEffect, useMemo } from "react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Plus, Minus, X, Package, Search, SlidersHorizontal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const { toast } = useToast();

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return cats.sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        // Already sorted by created_at from API
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    fetchProducts();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      fetchCart(user.id);
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const fetchCart = async (userId: string) => {
    const { data, error } = await supabase
      .from("cart_items")
      .select("*, product:products(*)")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching cart:", error);
    } else {
      setCart(data?.map(item => ({
        ...item,
        product: item.product as Product
      })) || []);
    }
  };

  const addToCart = async (product: Product) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to add items to cart",
        variant: "destructive",
      });
      return;
    }

    const existingItem = cart.find(item => item.product_id === product.id);

    if (existingItem) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id);

      if (!error) {
        setCart(cart.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
        toast({ title: "Cart updated", description: `${product.name} quantity increased` });
      }
    } else {
      const { data, error } = await supabase
        .from("cart_items")
        .insert({ user_id: user.id, product_id: product.id, quantity: 1 })
        .select("*, product:products(*)")
        .single();

      if (!error && data) {
        setCart([...cart, { ...data, product: data.product as Product }]);
        toast({ title: "Added to cart", description: `${product.name} added to your cart` });
      }
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", itemId);

    if (!error) {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId);

    if (!error) {
      setCart(cart.filter(item => item.id !== itemId));
      toast({ title: "Removed from cart" });
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <section id="products" className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Wellness Products
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover curated products to support your holistic wellness journey
            </p>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="wellness" className="relative">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-6 h-6 text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart ({cartCount} items)</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 p-3 bg-secondary/50 rounded-lg">
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.product.name}</h4>
                          <p className="text-primary font-semibold">${item.product.price}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-lg font-semibold mb-4">
                        <span>Total:</span>
                        <span className="text-primary">${cartTotal.toFixed(2)}</span>
                      </div>
                      <Button variant="wellness" className="w-full" onClick={() => toast({ title: "Checkout", description: "Checkout functionality coming soon!" })}>
                        Proceed to Checkout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px]">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No products found matching your criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 border border-border animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-primary bg-sage-light px-2 py-1 rounded-full">
                  {product.category}
                </span>
                <h3 className="font-semibold text-foreground mt-3 mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-primary">${product.price}</span>
                  <Button variant="wellness" size="sm" onClick={() => addToCart(product)}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
