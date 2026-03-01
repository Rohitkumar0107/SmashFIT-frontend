import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import bgImage from '../assets/bg.png';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [otpType, setOtpType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const navigate = useNavigate();

  useEffect(() => {
    // Get email and OTP type from sessionStorage
    const storedEmail = sessionStorage.getItem('otpEmail');
    const storedOtpType = sessionStorage.getItem('otpType');

    if (!storedEmail || !storedOtpType) {
      navigate('/login');
      return;
    }

    setEmail(storedEmail);
    setOtpType(storedOtpType);
  }, [navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!otp || otp.length !== 6) {
        setError('Please enter a valid 6-digit OTP');
        setLoading(false);
        return;
      }

      let response;

      // Call the appropriate verification endpoint based on OTP type
      if (otpType === 'registration') {
        response = await authService.verifyRegistrationOtp(email, otp);
      } else if (otpType === 'login') {
        response = await authService.verifyLoginOtp(email, otp);
      } else if (otpType === 'oauth') {
        response = await authService.verifyOAuthOtp(email, otp);
      } else {
        throw new Error('Invalid OTP type');
      }

      // Store token and redirect to dashboard
      if (response.token) {
        localStorage.setItem('accessToken', response.token);
        
        // Clear sessionStorage after successful verification
        sessionStorage.removeItem('otpEmail');
        sessionStorage.removeItem('otpType');

        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
          ? err.message
          : 'OTP verification failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);

    try {
      // Resend OTP based on type
      if (otpType === 'registration') {
        // Re-register to get new OTP
        // This would require storing more info - skip for now
        setError('Please try logging out and registering again.');
      } else if (otpType === 'login') {
        // Would need to re-initiate login - for now show message
        setError('Please go back to login and try again.');
      } else if (otpType === 'oauth') {
        // Would need to re-initiate OAuth - for now show message
        setError('Please go back and try OAuth login again.');
      }
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Failed to resend OTP. Please try again later.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* OTP Verification Card */}
      <div className="relative z-20 bg-white/90 p-6 md:p-8 rounded-xl shadow-2xl w-[90%] sm:w-96 max-w-md backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          We've sent a verification code to<br />
          <span className="font-semibold">{email}</span>
        </p>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Enter 6-Digit OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(value);
              }}
              maxLength={6}
              className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="000000"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        {/* Timer and Resend */}
        <div className="mt-6 text-center">
          {timeLeft > 0 ? (
            <p className="text-sm text-gray-600 mb-2">
              Code expires in: <span className="font-semibold text-blue-600">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <p className="text-sm text-red-600 mb-2 font-semibold">
              OTP has expired
            </p>
          )}

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={loading}
            className="text-sm text-blue-600 hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Didn't receive the code? Resend
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem('otpEmail');
              sessionStorage.removeItem('otpType');
              navigate('/login');
            }}
            className="flex-1 text-sm text-gray-700 font-medium hover:text-gray-900 transition"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
