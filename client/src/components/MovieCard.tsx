import {Card, CardContent} from "@/components/ui/card.tsx";
import {Heart} from "lucide-react";
import {NavLink} from "react-router";
import type {MovieType} from "@root/types/movieTypes.ts";
import {getYear} from "@/lib/date.ts";

export default function MovieCard(data: {movie: Partial<MovieType>}) {
    return (
        <>
            <NavLink key={data.movie.id} to={`/movie/${data.movie.id}`}>
                <div
                    className="bg-card hover:shadow-xl transition-all hover:translate-y-[-2px] cursor-pointer rounded-lg">
                    <div className="relative">
                        <div
                            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                            <span className="text-yellow-500 font-bold">{data.movie.rating}</span>
                            <span className="text-yellow-500"> ⭐</span>
                        </div>
                        <img
                            src={data.movie.poster}
                            alt={data.movie.title}
                            className="w-full h-full object-cover rounded-t-2xl"
                        />
                    </div>
                    <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{data.movie.title}</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">{getYear(data.movie.releasedAt as Date)}</span>
                            <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4 text-primary"/>
                                <span>{data.movie.likes}</span>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </NavLink>
        </>
    )
}