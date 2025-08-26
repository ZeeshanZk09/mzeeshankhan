// 'use client';

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useCallback,
//   useActionState,
//   useOptimistic,
//   useState,
// } from 'react';
// import { IUser } from '@/types/userSchemaType';
// import { useRouter } from 'next/navigation';
// import Loading from '@/components/ui/Loader';
// import axios from 'axios';
// import toastService from '@/services/toastService';

// // Define more precise types

// type UserContextType = {
//   users: SafeUser[] | null;
//   user: SafeUser | null;
//   loading: boolean;
//   error: string | null;
//   handleSignOut: () => Promise<void>;
//   handleSignIn: (credentials: AuthCredentials) => Promise<void>;
//   handleSignUp: (payload: SignUpPayload) => Promise<void>;
//   uploadImage: (file: File) => Promise<ImageUpload | null>;
//   refetchUser: () => Promise<void>;
//   // New optimistic update function
//   updateUserOptimistically: (updates: Partial<SafeUser>) => void;
// };

// const UserContext = createContext<UserContextType>({
//   users: null,
//   user: null,
//   loading: true,
//   error: null,
//   handleSignOut: async () => {},
//   handleSignIn: async () => {},
//   handleSignUp: async () => {},
//   uploadImage: async () => null,
//   refetchUser: async () => {},
//   updateUserOptimistically: () => {},
// });

// export const useUser = () => useContext(UserContext);

// export function UserProvider({
//   children,
//   adminOnly = false,
// }: {
//   children: React.ReactNode;
//   adminOnly?: boolean;
// }) {
//   const router = useRouter();

//   // Use useActionState for form-related state management
//   const [state, formAction, isPending] = useActionState(
//     async (prevState: any, formData: FormData) => {
//       // This would be handled by your form actions
//       return prevState;
//     },
//     { users: null, user: null, loading: true }
//   );

//   const [optimisticUser, setOptimisticUser] = useOptimistic<SafeUser | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [initialLoad, setInitialLoad] = useState(true);

//   // Helper function to handle API errors consistently

//   // Memoized API calls with enhanced error handling
//   const fetchCurrentUser = useCallback(async (): Promise<SafeUser | null> => {
//     try {
//       if (!localStorage.getItem('userData')) return null;

//       // Using React's use() hook for promise handling (experimental)
//       const userPromise = axios.get<SafeUser>('/api/current-user', {
//         timeout: 10000,
//         withCredentials: true,
//       });

//       // Note: use() is experimental but demonstrates the pattern
//       // In a real implementation, you might want to handle this differently
//       const { data } = await userPromise;
//       return data;
//     } catch (error) {
//       handleApiError(error, 'Failed to authenticate');
//       return null;
//     }
//   }, []);

//   const fetchAllUsers = useCallback(async (): Promise<SafeUser[] | null> => {
//     try {
//       const { data } = await axios.get<SafeUser[]>('/api/admin/get-all-users', {
//         timeout: 10000,
//         withCredentials: true,
//       });
//       return data;
//     } catch (error) {
//       handleApiError(error, 'Failed to fetch users');
//       return null;
//     }
//   }, []);

//   // Optimistic update function
//   const updateUserOptimistically = useCallback(
//     (updates: Partial<SafeUser>) => {
//       if (!state.user) return;

//       setOptimisticUser({ ...state.user, ...updates });

//       // In a real implementation, you would also make the API call here
//       // and revert if it fails
//     },
//     [state.user, setOptimisticUser]
//   );

//   // Authentication handlers with retry logic
//   const handleSignIn = useCallback(
//     async (credentials: AuthCredentials) => {
//       setError(null);

//       try {
//         const { data } = await axios.post<SafeUser>('/api/auth/sign-in', credentials, {
//           headers: { 'Content-Type': 'application/json' },
//           timeout: 10000,
//           withCredentials: true,
//         });

//         // Update state optimistically
//         setOptimisticUser(data);

//         // Update actual state
//         setState((prev) => ({ ...prev, user: data, users: null }));
//         localStorage.setItem('userData', JSON.stringify(data));
//         toastService.success('Signed in successfully');
//         setTimeout(() => router.push('/profile'), 3000);
//       } catch (error) {
//         const errorMessage = handleApiError(error, 'Sign in failed');
//         toastService.error(errorMessage);

//         // If it's a network error, suggest retrying
//         if (axios.isAxiosError(error) && !error.response) {
//           toastService.info('Network error - please check your connection');
//         }
//       }
//     },
//     [router, setOptimisticUser]
//   );

//   const uploadImage = useCallback(async (file: File): Promise<ImageUpload | null> => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const { data } = await axios.post<{ uploads: ImageUpload[] }>('/api/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         timeout: 30000, // Longer timeout for file uploads
//       });

//       return data.uploads[0] || null;
//     } catch (error) {
//       handleApiError(error, 'Image upload failed');
//       return null;
//     }
//   }, []);

//   const handleSignUp = useCallback(
//     async (payload: SignUpPayload) => {
//       setError(null);

//       try {
//         // Validate passwords match
//         if (payload.password !== payload.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }

//         // Upload images in parallel if both exist
//         const [profilePicUpload, coverPicUpload] = await Promise.all([
//           payload.profilePic ? uploadImage(payload.profilePic) : Promise.resolve(null),
//           payload.coverPic ? uploadImage(payload.coverPic) : Promise.resolve(null),
//         ]);

//         // Prepare the data to send
//         const { firstName, lastName, username, password, phone, email } = payload;

//         const { data } = await axios.post<SafeUser>(
//           '/api/auth/sign-up',
//           {
//             firstName,
//             lastName,
//             email,
//             username,
//             password,
//             phone,
//             profilePic: profilePicUpload,
//             coverPic: coverPicUpload,
//           },
//           {
//             headers: { 'Content-Type': 'application/json' },
//             timeout: 15000,
//             withCredentials: true,
//           }
//         );

//         // Update state optimistically
//         setOptimisticUser(data);

//         // Update actual state
//         setState((prev) => ({ ...prev, user: data, users: null }));
//         toastService.success('Registered successfully!');
//         router.push('/profile');
//       } catch (error) {
//         const errorMessage = handleApiError(error, 'Registration failed');
//         toastService.error(errorMessage);

//         // Special handling for duplicate email/username
//         if (axios.isAxiosError(error) && error.response?.status === 409) {
//           toastService.info('This email or username is already registered');
//         }
//       }
//     },
//     [router, uploadImage, setOptimisticUser]
//   );

//   const refetchUser = useCallback(async () => {
//     try {
//       const user = await fetchCurrentUser();
//       if (user) {
//         setState((prev) => ({ ...prev, user }));
//       } else {
//         router.push('/sign-in');
//       }
//     } catch (error) {
//       handleApiError(error, 'Failed to refresh user data');
//     }
//   }, [fetchCurrentUser, router]);

//   const handleSignOut = useCallback(async () => {
//     try {
//       await axios.post(
//         '/api/auth/sign-out',
//         {},
//         {
//           timeout: 5000,
//           withCredentials: true,
//         }
//       );

//       // Optimistically clear user data
//       setOptimisticUser(null);

//       // Update actual state
//       setState({ users: null, user: null, loading: false });
//       localStorage.removeItem('userData');
//       toastService.success('Signed out successfully');
//       router.push('/sign-in');
//     } catch (error) {
//       handleApiError(error, 'Failed to sign out');
//     }
//   }, [router, setOptimisticUser]);

//   // Initialize user data
//   useEffect(() => {
//     let mounted = true;

//     const initializeUser = async () => {
//       try {
//         const cachedUser = localStorage.getItem('userData');
//         if (cachedUser) {
//           const parsedUser = JSON.parse(cachedUser);
//           if (mounted) {
//             setState((prev) => ({ ...prev, user: parsedUser, loading: false }));
//           }
//         }

//         const user = await fetchCurrentUser();

//         if (!mounted) return;

//         if (!user) {
//           localStorage.removeItem('userData');
//           router.push('/sign-in');
//           return;
//         }

//         // Update state
//         setState((prev) => ({ ...prev, user, loading: false }));
//         localStorage.setItem('userData', JSON.stringify(user));
//         setInitialLoad(false);

//         if (user.isAdmin) {
//           const users = await fetchAllUsers();
//           if (mounted) setState((prev) => ({ ...prev, users }));
//         }
//       } catch (error) {
//         if (!mounted) return;
//         handleApiError(error, 'Failed to initialize user');
//         router.push('/sign-in');
//       } finally {
//         if (mounted) {
//           setInitialLoad(false);
//           setState((prev) => ({ ...prev, loading: false }));
//         }
//       }
//     };

//     initializeUser();

//     return () => {
//       mounted = false;
//     };
//   }, [router, adminOnly, fetchCurrentUser, fetchAllUsers]);

//   // Memoized context value
//   const contextValue = {
//     users: state.users,
//     user: optimisticUser || state.user, // Use optimistic value if available
//     loading: state.loading || isPending,
//     error,
//     handleSignOut,
//     handleSignIn,
//     handleSignUp,
//     uploadImage,
//     refetchUser,
//     updateUserOptimistically,
//   };

//   if (initialLoad) {
//     return <Loading />;
//   }

//   return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
// }
