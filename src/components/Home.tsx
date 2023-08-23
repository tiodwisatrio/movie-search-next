"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Genres from "./Genres";
import { BsPlayFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { FiInstagram, FiLinkedin, FiGithub, FiMail, FiPhone } from 'react-icons/fi'
import dynamic from "next/dynamic";
import Link from "next/link";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

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
        release_date: string;
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
    const [showPlayer, setShowPlayer] = useState(false);
    const [trailer, setTrailer] = useState("");

    useEffect(() => {
        const trailerIndex = movie?.videos?.results?.findIndex(
            (video) => video.type === "Trailer"
        );
        const trailerURL = `https://www.youtube.com/watch?v=${movie?.videos?.results[trailerIndex || 0]?.key
            }`;

        setTrailer(trailerURL);
    }, [movie]);

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
    }, [searchParams]);

    return (
        <div className="relative">
            {isLoading && <Loading />}
            <div className="container mx-auto flex items-center relative">
                <div className="flex flex-col lg:flex-row gap-4 lg:mx-10 py-4 w-full">
                    <div className="mx-auto flex-none relative w-[30%]">
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

                    <div className="space-y-4 ">
                        <div className="uppercase text-[40px] font-medium text-white text-center md:text-start">
                            {movie?.title}
                        </div>
                        <div className="flex gap-4 flex-wrap text-[10px] justify-center md:justify-start">
                            {movie?.genres.map((genre, index) => (
                                <Genres
                                    key={genre?.id}
                                    index={index}
                                    length={movie?.genres?.length}
                                    name={genre?.name}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-[12px] justify-center md:justify-start items-center md:items-start">
                            <p>Language: {movie?.original_language.toLocaleUpperCase()}</p>
                            <p>Release Date: {movie?.release_date}</p>
                            <p>Runtime: {movie?.runtime} minutes</p>
                            <p>Rating: {movie?.vote_average}⭐</p>
                        </div>

                        <div className="px-8 md:px-0 pt-6 md:pt-10 space-y-2 pr-4">
                            <h4 className="text-[20px]">OVERVIEW</h4>
                            <p className="line-clamp-6 text-sm opacity-80">{movie?.overview}</p>
                        </div>

                        <div
                            className="inline-block pt-6 px-8 md:px-0 cursor-pointer"
                            onClick={() => setShowPlayer(true)}
                        >
                            <div className="flex gap-2 items-center bg-white hover:bg-accent text-black px-4 py-2 rounded">
                                <BsPlayFill size={24} />
                                <p>Watch Trailer</p>
                            </div>
                        </div>
                    </div>


                    {/* My Profile */}
                    <div className="flex flex-col border-l-2 border-gray-600 mt-10 px-4 md:px-0">
                        <div className="ml-4">
                            <h2 className="text-[20px]">Lets Talk With Me👋</h2>
                            <div className="mt-8 pb-4 md:pb-0 md:mt-16 flex flex-col gap-6 text-gray-400">
                                <Link href="https://instagram.com/tiodwisatrio_" target="_blank" className="flex flex-row gap-x-2 items-center hover:text-white">
                                    <FiInstagram />
                                    <p>tiodwisatrio_</p>
                                </Link>
                                <Link href="https://www.linkedin.com/in/tio-dwi-satrio-a91153177/" target="_blank" className="flex flex-row gap-x-2 items-center hover:text-white">
                                    <FiLinkedin />
                                    <p>Tio Dwi Satrio</p>
                                </Link>
                                <Link href="https://github.com/tiodwisatrio" target="_blank" className="flex flex-row gap-x-2 items-center hover:text-white">
                                    <FiGithub />
                                    <p>tiodwisatrio</p>
                                </Link>
                                <Link href="mailto:tiodwisatrio27@gmail.com" target="_blank" className="flex flex-row gap-x-2 items-center hover:text-white">
                                    <FiMail />
                                    <p>tiodwisatrio27@gmail.com</p>
                                </Link>
                                <Link href="https://api.whatsapp.com/send/?phone=6288972061745" target="_blank" className="flex flex-row gap-x-2 items-center hover:text-white">
                                    <FiPhone />
                                    <p>088972061745</p>
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>

                {/* React Player */}
                <div
                    className={`absolute inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${showPlayer ? "opacity-100 z-50" : "opacity-0 -z-10"
                        }`}
                >
                    <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
                        <span className="font-semibold">Playing Trailer</span>
                        <div
                            className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                            onClick={() => setShowPlayer(false)}
                        >
                            <IoMdClose className="h-5" />
                        </div>
                    </div>
                    <div className="relative pt-[56.25%]">
                        <ReactPlayer
                            url={trailer}
                            width="100%"
                            height="100%"
                            style={{ position: "absolute", top: "0", left: "0" }}
                            controls={true}
                            playing={showPlayer}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
