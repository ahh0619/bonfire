import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input
        className="border border-gray-300 rounded-md p-2"
        id="email"
        name="email"
        type="email"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        className="border border-gray-300 rounded-md p-2"
        id="password"
        name="password"
        type="password"
        required
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        formAction={login}
      >
        Log in
      </button>
    </form>
  );
}
