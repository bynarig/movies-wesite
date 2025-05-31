import {Route, Routes} from "react-router";
import Main from "@/pages/Main.tsx";
import SignUpPage from "@/pages/SignUp.tsx";
import SignInPage from "@/pages/SignIn.tsx";
import ForgotPasswordPage from "@/pages/ForgotPassword.tsx";
import ProfilePage from "@/pages/user/Profile.tsx";
import NotFoundPage from "@/pages/404.tsx";
import MoviePage from "@/pages/movie/id/Movie.tsx";
import ActorsPage from "@/pages/actors/Actors.tsx";
import DirectorsPage from "@/pages/directors/Directors.tsx";
import ProfilePublicPage from "@/pages/profile/Profile.tsx";
import SeriesPage from "@/pages/series/id/Series.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";

export default function RouterIndex() {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route index element={<Main/>}/>
                <Route path="signup" element={<SignUpPage/>}/>
                <Route path="signin" element={<SignInPage/>}/>
                <Route path="forgotpassword" element={<ForgotPasswordPage/>}/>
                <Route path="user">
                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route path=":userId" element={<ProfilePublicPage/>}/>
                </Route>
                <Route path="movie/:movieId" element={<MoviePage/>}></Route>
                <Route path="series/:seriesId" element={<SeriesPage/>}></Route>
                <Route path="actors" element={<ActorsPage/>}></Route>
                <Route path="directors" element={<DirectorsPage/>}></Route>
                <Route path=":other" element={<NotFoundPage/>}/>
            </Route>

        </Routes>
    )
}