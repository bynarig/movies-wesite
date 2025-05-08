// src/providers/auth-provider.tsx
import {GoogleOAuthProvider} from '@react-oauth/google';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();


export function AuthProvider({children}: { children: React.ReactNode }) {
    return (
        <GoogleOAuthProvider clientId="154030691903-s68jt42ceki4qf2mr2hrjm1m00jquki2.apps.googleusercontent.com">
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </GoogleOAuthProvider>
    );
}