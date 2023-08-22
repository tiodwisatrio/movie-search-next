"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const Home = () => {
    interface IMovie {
        poster_path: string;
        title: string;
        genres: [
            {
                name: string;
                id: string;
            }
        ];
        original_language: string;
        releas_date: string;
        runtime: string;
        vote_average: string;
        overview: string;
        videos: {
            results: [
                {
                    type: string;
                    key: string;
                }
            ];
        };
    }

    const [isLoading, setIsLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [movie, setMovie] = useState<IMovie>();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsLoading(true);
        setIsImageLoading(true);

        let searchMovie = searchParams.get("movie");

        if (searchMovie === null) {
            searchMovie = "avengers";
        }

        axios
            .get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: process.env.NEXT_PUBLIC_API_KEY,
                    query: searchMovie,
                },
            })
            .then((res) => {
                axios
                    .get(
                        `https://api.themoviedb.org/3/movie/${res?.data?.results[0]?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`
                    )
                    .then((res) => {
                        setMovie(res.data);
                        setIsLoading(false);
                        console.log(res.data);
                    });
            });
    }, []);

    return (
        <div className="relative">
            {isLoading && <Loading />}
            <div className="container mx-auto flex items-center relative">
                <div className="flex flex-col lg:flex-row gap-10 lg:mx-10 py-4">
                    <div className="mx-auto flex-none relative">
                        {/* create Image Component from Next Image */}
                        <Image
                            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                            alt="poster_movie"
                            width={300}
                            height={500}
                            className="rounded object-cover"
                            onLoad={() => setIsImageLoading(false)}
                            priority
                        />
                        {isImageLoading && <Loading />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
