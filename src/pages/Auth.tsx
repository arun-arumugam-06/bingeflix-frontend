import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Play, Star, Shield, Download } from 'lucide-react';

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Auth = () => {
  const { user, loading, signUp, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!validateEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }
    if (!name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!age || isNaN(Number(age)) || Number(age) < 1) {
      setFormError('Please enter a valid age.');
      return;
    }
    setIsSubmitting(true);
    const result = await signUp(email, password);
    if (result && result.user) {
      // Create user profile in backend
      await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: result.user.id,
          name,
          age: Number(age)
        })
      });
    }
    setIsSubmitting(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!validateEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }
    setIsSubmitting(true);
    await signIn(email, password);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1489599611673-c5b6b8a7a4ac?w=1920&h=1080&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Brand & Features */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="primary-gradient bg-clip-text text-transparent">
                  BingeFlix
                </span>
                <br />
                <span className="text-white">Prime</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                Stream thousands of movies, TV shows, and live sports. 
                Experience entertainment like never before.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center space-x-2 text-gray-300">
                <Play className="w-5 h-5 text-primary" />
                <span>4K Streaming</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Download className="w-5 h-5 text-primary" />
                <span>Download</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Star className="w-5 h-5 text-primary" />
                <span>Premium Content</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Shield className="w-5 h-5 text-primary" />
                <span>Ad-Free</span>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="w-full max-w-md mx-auto">
            <Card className="glass-effect border-border/50 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome</CardTitle>
                <CardDescription>
                  Sign in to your account or create a new one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin" className="space-y-4 mt-6">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {formError && (
                        <div className="text-red-500 text-sm text-center">{formError}</div>
                      )}
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          'Sign In'
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="space-y-4 mt-6">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-age">Age</Label>
                        <Input
                          id="signup-age"
                          type="number"
                          placeholder="Enter your age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          required
                          min={1}
                        />
                      </div>
                      {formError && (
                        <div className="text-red-500 text-sm text-center">{formError}</div>
                      )}
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          'Create Account'
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;