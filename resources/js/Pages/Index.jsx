import React, { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Logo from "../../img/logo.webp";
import Hero from "../../img/hero.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import FeatureCard from "@/Components/Cards/FeatureCard";
import { features } from "@/Constants/features";
import Modal from "@/Components/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "@/Components/Button";
import { Link as ScrollLink } from "react-scroll";
import { testimonialData } from "@/Constants/testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import TestimonialCard from "@/Components/Cards/TestimonialCard";
import CandidateCard from "@/Components/Cards/CandidateCard";
import NoCandidates from "@/Components/Cards/NoCandidates";

export default function Index() {
    const { elections } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const { ref: featureRef, inView: inViewFeature } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { ref: candidatesRef, inView: inViewCandidates } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { ref: testimonialRef, inView: inViewTestimonial } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Head title="E-Voting">
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="font-[Poppins] bg-slate-50 text-gray-900">
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                        isScrolled
                            ? "bg-white/80 backdrop-blur-sm shadow-md py-2"
                            : "bg-transparent py-3"
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-2 md:py-4">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    className="h-9 md:h-10"
                                />
                                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                                    E-Voting
                                </h1>
                            </div>

                            <ul className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
                                {[
                                    "Beranda",
                                    "Tentang",
                                    "Alur",
                                    "Kandidat",
                                    "Testimoni",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="hover:text-purple-700 transition-colors"
                                    >
                                        <ScrollLink
                                            to={item.toLowerCase()}
                                            smooth={true}
                                            duration={500}
                                            offset={-90}
                                            className="cursor-pointer text-sm lg:text-base"
                                        >
                                            {item}
                                        </ScrollLink>
                                    </li>
                                ))}
                            </ul>

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="hidden md:block"
                            >
                                <Link
                                    href="/login"
                                    className="bg-purple-600 text-white font-semibold px-4 py-2 text-sm lg:px-5 rounded-full shadow-sm hover:bg-purple-700 transition"
                                >
                                    Masuk
                                </Link>
                            </motion.div>

                            <Button
                                className="md:hidden text-gray-700"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label={isOpen ? "Tutup menu" : "Buka menu"}
                            >
                                {isOpen ? (
                                    <AiOutlineClose size={28} />
                                ) : (
                                    <AiOutlineMenu size={28} />
                                )}
                            </Button>
                        </div>
                    </div>
                </motion.nav>

                <motion.section
                    id="beranda"
                    className="relative w-full overflow-hidden "
                >
                    <div className="max-w-screen-xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-16 items-center pt-32 pb-16 lg:min-h-screen lg:py-0">
                        <motion.div
                            className="text-center lg:text-left"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: { staggerChildren: 0.2 },
                                },
                            }}
                        >
                            <motion.h1
                                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tighter"
                                variants={{
                                    hidden: { opacity: 0, x: -50 },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                            duration: 0.8,
                                            ease: "easeOut",
                                        },
                                    },
                                }}
                            >
                                Suara Anda, <br className="lg:hidden" />
                                Masa Depan{" "}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-fuchsia-500">
                                    Kampus.
                                </span>
                            </motion.h1>

                            <motion.p
                                className="mt-6 max-w-lg mx-auto lg:mx-0 text-lg text-gray-600"
                                variants={{
                                    hidden: { opacity: 0, x: -50 },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                            duration: 0.8,
                                            ease: "easeOut",
                                        },
                                    },
                                }}
                            >
                                Platform e-voting canggih yang dirancang untuk
                                memastikan setiap suara berharga, terhitung, dan
                                transparan.
                            </motion.p>

                            <motion.div
                                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.8,
                                            ease: "easeOut",
                                        },
                                    },
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        (window.location.href = "/login")
                                    }
                                    className="bg-purple-600 text-white px-8 py-3 text-base font-semibold rounded-full shadow-lg shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    Gunakan Suara Anda
                                </Button>
                                <ScrollLink
                                    to="kandidat"
                                    smooth={true}
                                    duration={500}
                                    offset={-90}
                                    className="bg-white/50 backdrop-blur-sm cursor-pointer text-gray-700 border border-gray-300 px-8 py-3 text-base font-semibold rounded-full shadow-sm transform hover:-translate-y-1 hover:bg-white transition-all duration-300"
                                >
                                    Lihat Kandidat
                                </ScrollLink>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="hidden lg:flex relative w-full items-center justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 1,
                                delay: 0.4,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <div className="absolute w-[450px] h-[450px] bg-gradient-to-r from-purple-50 via-fuchsia-50 to-purple-100 rounded-3xl -rotate-12 z-10 blur-2xl animate-gradient"></div>
                            <motion.img
                                src={Hero}
                                className="relative z-20 object-contain w-full h-auto max-w-lg"
                                alt="Ilustrasi E-Voting Mahasiswa"
                                animate={{
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.section>

                <motion.section
                    id="tentang"
                    ref={featureRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inViewFeature ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="py-24"
                >
                    <div className="max-w-screen-xl mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <span className="text-purple-600 font-semibold uppercase tracking-wider">
                                MENGAPA KAMI?
                            </span>
                            <h2 className="text-3xl md:text-4xl text-gray-800 font-bold mt-2 mb-4">
                                Platform Pemilihan Terpercaya dan Inovatif
                            </h2>
                            <p className="text-lg text-gray-500">
                                Kami merancang sistem ini dengan tiga pilar
                                utama: keamanan, kemudahan akses, dan
                                transparansi untuk menjamin integritas setiap
                                suara.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="h-full"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={
                                        inViewFeature
                                            ? { opacity: 1, y: 0 }
                                            : {}
                                    }
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.2,
                                    }}
                                >
                                    <FeatureCard {...feature} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                <motion.section id="langkah" className="py-24">
                    <div className="max-w-screen-xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-purple-600 font-semibold">
                                PROSES MUDAH
                            </span>
                            <h2 className="text-3xl md:text-4xl text-gray-800 font-bold mt-2 mb-6">
                                Cara Menggunakan Suara Anda
                            </h2>
                            <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-16">
                                Hanya butuh beberapa menit untuk berpartisipasi
                                dalam demokrasi kampus. Ikuti 3 langkah mudah
                                berikut ini.
                            </p>
                        </motion.div>

                        <div className="relative flex flex-col md:flex-row md:justify-between items-center md:items-start gap-y-12 md:gap-x-8">
                            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 z-0">
                                <div className="w-full h-full border-t-2 border-dashed border-gray-300"></div>
                            </div>

                            <motion.div
                                className="relative z-10 flex flex-col items-center max-w-xs"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 border-2 border-purple-200 rounded-full text-2xl font-bold text-purple-600 shadow-lg">
                                    1
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-gray-800">
                                    Masuk & Verifikasi
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    Gunakan akun SIAKAD Anda untuk masuk ke
                                    dalam sistem dengan aman.
                                </p>
                            </motion.div>

                            <motion.div
                                className="relative z-10 flex flex-col items-center max-w-xs"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 border-2 border-purple-200 rounded-full text-2xl font-bold text-purple-600 shadow-lg">
                                    2
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-gray-800">
                                    Pilih Kandidat
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    Lihat profil dan visi-misi, lalu tentukan
                                    pilihan terbaik Anda.
                                </p>
                            </motion.div>

                            <motion.div
                                className="relative z-10 flex flex-col items-center max-w-xs"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 border-2 border-purple-200 rounded-full text-2xl font-bold text-purple-600 shadow-lg">
                                    3
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-gray-800">
                                    Konfirmasi Suara
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    Pastikan pilihan Anda sudah benar sebelum
                                    mengirimkan suara secara permanen.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    id="kandidat"
                    ref={candidatesRef}
                    className="py-24"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inViewCandidates ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-screen-xl mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <span className="text-purple-600 font-semibold uppercase tracking-wider">
                                PARA CALON
                            </span>
                            <h2 className="text-3xl md:text-4xl text-gray-800 font-bold mt-2 mb-4">
                                Kenali Kandidat Pilihan Anda
                            </h2>
                            <p className="text-lg text-gray-500">
                                Pelajari visi dan misi setiap pasangan calon
                                untuk menentukan pilihan terbaik Anda demi masa
                                depan kampus yang lebih maju.
                            </p>
                        </div>

                        {elections && elections.length > 0 ? (
                            <div className="space-y-16">
                                {elections.map((election, index) => (
                                    <motion.div
                                        key={election.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={
                                            inViewCandidates
                                                ? { opacity: 1, y: 0 }
                                                : {}
                                        }
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.2 * index,
                                        }}
                                    >
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-left border-b-2 border-purple-200 pb-4">
                                            {election.title}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                            {election.candidates.map(
                                                (candidate) => (
                                                    <CandidateCard
                                                        key={candidate.id}
                                                        candidate={candidate}
                                                        onClick={() =>
                                                            setSelectedCandidate(
                                                                candidate
                                                            )
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <NoCandidates />
                            </div>
                        )}
                    </div>

                    <AnimatePresence>
                        {selectedCandidate && (
                            <Modal
                                title={selectedCandidate?.name}
                                isOpen={!!selectedCandidate}
                                onClose={() => setSelectedCandidate(null)}
                                size="xl"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center p-4"
                                >
                                    <img
                                        src={selectedCandidate.photo_url}
                                        alt={selectedCandidate.name}
                                        className="w-1/2 md:w-1/3 mx-auto rounded-lg shadow-lg mb-6"
                                    />
                                    <div className="w-full text-left">
                                        <h4 className="text-xl font-bold text-purple-600 mt-4 mb-2 border-b pb-2">
                                            Visi
                                        </h4>
                                        <div
                                            className="prose prose-sm max-w-none text-gray-600"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedCandidate.vision,
                                            }}
                                        ></div>

                                        <h4 className="text-xl font-bold text-purple-600 mt-6 mb-2 border-b pb-2">
                                            Misi
                                        </h4>
                                        <div
                                            className="prose prose-sm max-w-none text-gray-600"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedCandidate.mission,
                                            }}
                                        ></div>
                                    </div>
                                </motion.div>
                            </Modal>
                        )}
                    </AnimatePresence>
                </motion.section>

                <motion.section
                    id="testimoni"
                    className="py-24 "
                    ref={testimonialRef}
                >
                    <div className="max-w-screen-xl mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <span className="text-purple-600 font-semibold uppercase tracking-wider">
                                TESTIMONI
                            </span>
                            <h2 className="text-3xl md:text-4xl text-gray-800 font-bold mt-2 mb-4">
                                Apa Kata Para Pemilih?
                            </h2>
                            <p className="text-lg text-gray-500">
                                Pengalaman nyata dari mahasiswa yang telah
                                menggunakan platform kami untuk menyalurkan
                                suaranya secara mudah, cepat, dan aman.
                            </p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                modules={[Autoplay]}
                                breakpoints={{
                                    768: { slidesPerView: 2, spaceBetween: 20 },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                }}
                                className="!pb-10"
                            >
                                {testimonialData.map((testimonial, index) => (
                                    <SwiperSlide key={index} className="flex">
                                        <div className="h-full flex flex-1">
                                            <TestimonialCard {...testimonial} />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </motion.div>
                    </div>
                </motion.section>

                <motion.footer
                    className="bg-purple-950 text-gray-300 pt-20 pb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className="max-w-screen-xl mx-auto px-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-6 mb-12">
                            <div className="lg:max-w-xs">
                                <div className="flex items-center gap-3 mb-4">
                                    <img
                                        src={Logo}
                                        alt="Logo"
                                        className="h-12 p-1 rounded-full"
                                    />
                                    <h2 className="text-xl font-bold text-white">
                                        Pemilwa UIN Malang
                                    </h2>
                                </div>
                                <p className="text-gray-400 text-sm mb-6">
                                    Sistem e-voting resmi untuk Pemilihan
                                    Mahasiswa di Universitas Islam Negeri
                                    Maulana Malik Ibrahim Malang.
                                </p>
                                <div className="flex items-center gap-4">
                                    <a
                                        href="https://www.instagram.com/uinmlg/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram UIN Malang"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <FaInstagram size={24} />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/c/UINMalang"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="YouTube UIN Malang"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <FaYoutube size={24} />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/infoUINmaliki/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook UIN Malang"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <FaFacebook size={24} />
                                    </a>
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <h3 className="mb-5 text-lg font-semibold text-white">
                                    Navigasi
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "Beranda",
                                        "Tentang",
                                        "Alur",
                                        "Kandidat",
                                        "Testimoni",
                                    ].map((item) => (
                                        <li key={item}>
                                            <ScrollLink
                                                to={item.toLowerCase()}
                                                smooth={true}
                                                duration={500}
                                                offset={-90}
                                                className="cursor-pointer hover:text-purple-400 transition-colors"
                                            >
                                                {item}
                                            </ScrollLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex-shrink-0">
                                <h3 className="mb-5 text-lg font-semibold text-white">
                                    Hubungi Kami
                                </h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-3">
                                        <IoMail className="flex-shrink-0 mt-1" />
                                        <a
                                            href="mailto:info@uin-malang.ac.id"
                                            className="whitespace-nowrap hover:text-purple-400 transition-colors"
                                        >
                                            info@uin-malang.ac.id
                                        </a>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <BsFillTelephoneFill className="flex-shrink-0 mt-1" />
                                        <a
                                            href="tel:+62341551354"
                                            className="whitespace-nowrap hover:text-purple-400 transition-colors"
                                        >
                                            +62 341 551354
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="w-full lg:w-72 flex-shrink-0">
                                <h3 className="mb-5 text-lg font-semibold text-white">
                                    Lokasi Kampus
                                </h3>
                                <div className="w-full h-40 bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.462405777685!2d112.60483417511132!3d-7.951073692073363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78815e45bbc56d%3A0x5031ab2d7d36dba6!2sMaulana%20Malik%20Ibrahim%20State%20Islamic%20University%20Malang!5e0!3m2!1sen!2sid!4v1754354782133!5m2!1sen!2sid"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Peta Lokasi UIN Malang"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-slate-700 pt-8 text-center text-gray-500">
                            <p>
                                © {new Date().getFullYear()} Pemilwa UIN Malang.
                                All rights reserved.
                            </p>
                        </div>
                    </div>
                </motion.footer>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-white z-50 md:hidden"
                        >
                            <motion.ul
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="h-full flex flex-col items-center justify-center space-y-8"
                            >
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-5 right-5 text-gray-700 text-4xl"
                                >
                                    ×
                                </Button>
                                {[
                                    "Beranda",
                                    "Tentang",
                                    "Alur",
                                    "Kandidat",
                                    "Testimoni",
                                ].map((item) => (
                                    <li key={item}>
                                        <ScrollLink
                                            to={item.toLowerCase()}
                                            smooth={true}
                                            duration={500}
                                            offset={-90}
                                            className="text-xl text-gray-700 font-semibold cursor-pointer"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item}
                                        </ScrollLink>
                                    </li>
                                ))}
                                <Link href="/login" passHref>
                                    <Button className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-purple-700 transition">
                                        Masuk
                                    </Button>
                                </Link>
                            </motion.ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
