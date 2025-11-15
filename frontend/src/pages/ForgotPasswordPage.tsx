import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend to send reset email
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-500 via-ocean-600 to-ocean-700 p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-elegant p-8 border border-border/50">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Quay lại đăng nhập</span>
          </button>

          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ocean-100 mb-4">
                  <Mail className="h-8 w-8 text-ocean-600" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Quên mật khẩu?
                </h1>
                <p className="text-muted-foreground">
                  Nhập email của bạn để nhận liên kết đặt lại mật khẩu
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <Button type="submit" className="w-full h-11" size="lg">
                  Gửi liên kết đặt lại
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Kiểm tra email của bạn
              </h2>
              <p className="text-muted-foreground mb-6">
                Chúng tôi đã gửi liên kết đặt lại mật khẩu đến
                <br />
                <span className="font-medium text-foreground">{email}</span>
              </p>
              <Button
                onClick={() => navigate("/auth")}
                variant="outline"
                className="w-full"
              >
                Quay lại đăng nhập
              </Button>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-white/80 mt-6">
          Không nhận được email?{" "}
          <button
            onClick={() => setIsSubmitted(false)}
            className="font-medium text-white hover:underline"
          >
            Gửi lại
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;