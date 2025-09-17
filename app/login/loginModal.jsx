export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="tel"
          placeholder="Enter phone number"
          className="w-full border rounded-md p-2 mb-4"
        />
        <p className="text-sm text-gray-500 mb-2">
          OTP will be shared for verification
        </p>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
          Login
        </button>
      </div>
    </div>
  );
}
