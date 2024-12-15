import { create } from 'zustand'
import { toast } from 'react-toastify'




const useAuthStore = create((set, get) => ({
  username: '',
  email: '',
  password: '',


  updateField: (field, value) => set((state) => ({ ...state, [field]: value})),

  signup: async () => {
    const { username, email, password } = get();

    if (!username || !email || !password) {
      return toast.error('Please provide all the details');
    }
    try {
      const res = await fetch('/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Sign up successful');
        set({ username: '', email: '', password: '' });
      } else {
        toast.error('Sign up error', data.message);
      }
    } catch (error) {
      toast.error('Network error', error);
    }
  },

  login: async (username, password, navigate) => {

    if (!username || !password) {
      return toast.error('Both username and password are required');
    
    }

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json();
      if (data.success) {
        toast.success('Log in successful');
        set({ username: '', password: '' })

      if (navigate) {
        navigate('/user')
      }

      } else {
        toast.error('Log in failed', data.message);
      }
    } catch (error) {
      toast.error('Network error', error)
    }
  }

}))

export default useAuthStore