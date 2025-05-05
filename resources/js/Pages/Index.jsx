import React, { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Logo from "../../img/logo.webp";
import Hero from "../../img/hero.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
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
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Head title="E-Voting">
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="font-[Poppins] bg-white text-gray-900">
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                        isScrolled
                            ? "bg-white shadow-md py-2"
                            : "bg-transparent py-3"
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-3">
                                <img src={Logo} alt="Logo" className="h-10" />
                                <h1 className="text-2xl font-bold text-gray-900">
                                    E-Voting
                                </h1>
                            </div>

                            <motion.ul
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="hidden md:flex space-x-6 text-gray-500"
                            >
                                <li className="hover:text-purple-700 cursor-pointer">
                                    <ScrollLink
                                        to="home"
                                        smooth={true}
                                        duration={500}
                                        offset={-90}
                                        className="cursor-pointer"
                                    >
                                        Beranda
                                    </ScrollLink>
                                </li>
                                <li className="hover:text-purple-700 cursor-pointer">
                                    <ScrollLink
                                        to="feature"
                                        smooth={true}
                                        offset={-90}
                                        duration={500}
                                        className="cursor-pointer"
                                    >
                                        Tentang
                                    </ScrollLink>
                                </li>

                                <li className="hover:text-purple-700 cursor-pointer">
                                    <ScrollLink
                                        to="candidates"
                                        smooth={true}
                                        duration={500}
                                        offset={-90}
                                        className="cursor-pointer"
                                    >
                                        Kandidat
                                    </ScrollLink>
                                </li>
                                <li className="hover:text-purple-700 cursor-pointer">
                                    <ScrollLink
                                        to="testimonials"
                                        smooth={true}
                                        duration={500}
                                        offset={-90}
                                        className="cursor-pointer"
                                    >
                                        Testimoni
                                    </ScrollLink>
                                </li>
                            </motion.ul>

                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="hidden md:block bg-purple-600 text-white font-semibold px-5 py-2 rounded-full shadow-sm hover:bg-purple-700 transition"
                            >
                                <Link href="/login">Masuk</Link>
                            </motion.div>

                            <Button
                                className="md:hidden text-gray-700"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? (
                                    <AiOutlineClose size={28} />
                                ) : (
                                    <AiOutlineMenu size={28} />
                                )}
                            </Button>
                        </div>

                        {isOpen && (
                            <motion.ul
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-6 z-50 shadow-lg"
                            >
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-5 right-5 text-gray-700 text-3xl"
                                >
                                    &times;
                                </Button>
                                <ScrollLink
                                    to="home"
                                    smooth={true}
                                    duration={500}
                                    offset={-90}
                                    className="text-lg font-semibold text-gray-900 cursor-pointer"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Beranda
                                </ScrollLink>
                                <ScrollLink
                                    to="feature"
                                    smooth={true}
                                    duration={500}
                                    offset={-90}
                                    className="text-lg text-gray-700 cursor-pointer"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Tentang
                                </ScrollLink>
                                <ScrollLink
                                    to="candidates"
                                    smooth={true}
                                    duration={500}
                                    offset={-90}
                                    className="text-lg text-gray-700 cursor-pointer"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Kandidat
                                </ScrollLink>
                                <ScrollLink
                                    to="testimonials"
                                    smooth={true}
                                    duration={500}
                                    offset={-90}
                                    className="text-lg text-gray-700 cursor-pointer"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Testimoni
                                </ScrollLink>
                                <Link href="/login" passHref>
                                    <Button className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-purple-700 transition">
                                        Masuk
                                    </Button>
                                </Link>
                            </motion.ul>
                        )}
                    </div>
                </motion.nav>
                <motion.section
                    className="flex flex-col-reverse gap-0 bg md:flex-row justify-between items-center mx-auto my-0 max-w-screen-xl md:min-h-screen px-6 pt-[100px] sm:pt-[75px] md:pt-[60px] pb-20"
                    id="home"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="max-w-[600px] text-center md:text-left"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                            Sistem{" "}
                            <span className="text-purple-600">E-Voting</span>
                        </h1>
                        <motion.p
                            className="text-gray-700 mt-4 text-base sm:text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            Wujudkan pemilihan mahasiswa yang lebih mudah,
                            cepat, dan transparan dengan sistem e-voting modern.
                        </motion.p>

                        <motion.div
                            className="mt-6 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <Button
                                onClick={() =>
                                    (window.location.href = "/login")
                                }
                                className="bg-purple-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-purple-600 transition"
                            >
                                Voting Sekarang
                            </Button>

                            <ScrollLink
                                to="candidates"
                                smooth={true}
                                duration={500}
                                offset={-90}
                                className="bg-transparent cursor-pointer text-purple-600 border border-purple-600 px-6 py-3 rounded-full shadow-md hover:bg-purple-600 hover:text-white transition"
                            >
                                Kandidat
                            </ScrollLink>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] max-md:w-full max-md:h-auto"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.img
                            src={Hero}
                            className="object-contain size-full"
                            alt="E-Voting Illustration"
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>
                </motion.section>

                <hr />

                <motion.section
                    ref={featureRef}
                    id="feature"
                    initial={{ opacity: 0, y: 50 }}
                    animate={inViewFeature ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="px-0 pt-[110px] md:pb-0 m-0 md:min-h-screen"
                >
                    <div className="px-6 py-0 mx-auto my-0 max-w-screen-xl text-center">
                        <h2 className="mb-8 text-4xl text-gray-800 font-semibold">
                            Mengapa Memilih E-Voting?
                        </h2>
                        <p className="mb-20 text-base text-gray-600 max-w-3xl mx-auto">
                            Sistem pemilihan digital modern yang cepat, aman,
                            dan transparan .
                        </p>
                        <div className="flex gap-8 justify-center max-md:flex-col">
                            {features.map((feature, index) => (
                                <FeatureCard
                                    key={index}
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                />
                            ))}
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    id="candidates"
                    ref={candidatesRef}
                    className="px-0 pt-[110px] pb-5 md:pb-10 m-0 md:min-h-screen bg-[#FAFAF9]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inViewCandidates ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="px-6 mx-auto max-w-screen-xl text-center">
                        <h2 className="mb-8 text-4xl text-gray-800 font-semibold">
                            Kandidat Pemilwa
                        </h2>
                        <p className="mb-16 text-base text-gray-600">
                            Daftar kandidat dalam pemilihan mahasiswa UIN
                            Malang.
                        </p>

                        {elections.map((election, index) => (
                            <motion.div
                                key={election.id}
                                className="mb-16 "
                                initial={{ opacity: 0, y: 30 }}
                                animate={
                                    inViewCandidates ? { opacity: 1, y: 0 } : {}
                                }
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2 * index,
                                }}
                            >
                                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                                    {election.title}
                                </h3>
                                <motion.div
                                    className="flex flex-wrap gap-8 justify-center"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                            opacity: 1,
                                            transition: {
                                                staggerChildren: 0.2,
                                            },
                                        },
                                    }}
                                >
                                    {election.candidates.map((candidate) => (
                                        <motion.div
                                            key={candidate.id}
                                            className="w-[300px] h-[400px] bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out"
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() =>
                                                setSelectedCandidate(candidate)
                                            }
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <img
                                                src={candidate.photo_url}
                                                alt={candidate.name}
                                                className="object-cover w-full h-5/6 rounded-t-lg"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {candidate.name}
                                                </h3>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        ))}
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
                                    className="flex flex-col items-center"
                                >
                                    <img
                                        src={selectedCandidate.photo_url}
                                        alt={selectedCandidate.name}
                                        className="w-1/3 mx-auto rounded-lg"
                                    />
                                    <h4 className="text-lg font-semibold text-purple-600 mt-4">
                                        Visi
                                    </h4>
                                    <div
                                        className="prose prose-sm text-gray-600"
                                        dangerouslySetInnerHTML={{
                                            __html: selectedCandidate.vision,
                                        }}
                                    ></div>
                                    <h4 className="text-lg font-semibold text-purple-600 mt-4">
                                        Misi
                                    </h4>
                                    <div
                                        className="prose prose-sm text-gray-600"
                                        dangerouslySetInnerHTML={{
                                            __html: selectedCandidate.mission,
                                        }}
                                    ></div>
                                </motion.div>
                            </Modal>
                        )}
                    </AnimatePresence>
                </motion.section>

                <motion.section
                    id="testimonials"
                    ref={testimonialRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inViewTestimonial ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="relative px-4 sm:px-6 pt-[110px] m-0 md:min-h-[90vh] pb-16 md:pb-10 text-center"
                >
                    <div className="mx-auto my-0 w-full max-w-[1200px]">
                        <h2 className="mb-8 text-4xl text-gray-800 font-semibold">
                            Apa Kata Mereka?
                        </h2>
                        <p className="mx-auto mt-0 mb-16 text-base text-center text-gray-600 max-w-[600px]">
                            Dengarkan pengalaman mereka yang telah menggunakan
                            platform kami.
                        </p>

                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            modules={[Autoplay]}
                        >
                            {testimonialData.map((testimonial, index) => (
                                <SwiperSlide key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={
                                            inViewTestimonial
                                                ? { opacity: 1, y: 0 }
                                                : {}
                                        }
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.2,
                                        }}
                                    >
                                        <TestimonialCard {...testimonial} />
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </motion.section>

                <motion.footer
                    className="bg-white border-t border-gray-200 py-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mx-auto max-w-screen-xl px-6">
                        <div className="flex justify-between mb-8 max-sm:flex-col max-sm:gap-8">
                            <div className="max-w-[284px] max-sm:max-w-full">
                                <div className="flex gap-2 items-center mb-6">
                                    <div>
                                        <img
                                            src={Logo}
                                            alt="Logo"
                                            className="h-20 mb-4"
                                        />

                                        <h2 className="text-xl font-bold text-gray-900">
                                            Pemilwa UIN Malang
                                        </h2>
                                        <p className="text-gray-600 text-sm mt-2 max-w-xs">
                                            Sistem e-voting resmi untuk
                                            Pemilihan Mahasiswa (Pemilwa) di
                                            Universitas Islam Negeri Maulana
                                            Malik Ibrahim Malang.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-[284px] max-sm:max-w-full">
                                <h3 className="mb-5 text-lg font-semibold text-gray-900">
                                    Kontak
                                </h3>
                                <div className="p-0 m-0">
                                    <div className="flex gap-2 items-center mb-2 text-gray-600">
                                        <IoMail />
                                        <a
                                            href="mailto:info@uin-malang.ac.id"
                                            className="hover:underline hover:text-purple-600"
                                        >
                                            info@uin-malang.ac.id
                                        </a>
                                    </div>
                                    <div className="flex gap-2 items-center mb-2 text-gray-600">
                                        <BsFillTelephoneFill />
                                        <a
                                            href="tel:+62341551354"
                                            className="hover:underline hover:text-purple-600"
                                        >
                                            +62 341 551354
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-[284px] max-sm:max-w-full">
                                <h3 className="mb-5 text-lg font-semibold text-gray-900">
                                    Tautan
                                </h3>
                                <ul>
                                    <li className="mb-2 text-gray-600">
                                        <ScrollLink
                                            to="home"
                                            smooth={true}
                                            duration={500}
                                            offset={-90}
                                            className="cursor-pointer hover:text-purple-600"
                                        >
                                            Beranda
                                        </ScrollLink>
                                    </li>
                                    <li className="mb-2 text-gray-600">
                                        <ScrollLink
                                            to="feature"
                                            smooth={true}
                                            duration={500}
                                            offset={-90}
                                            className="cursor-pointer hover:text-purple-600"
                                        >
                                            Tentang
                                        </ScrollLink>
                                    </li>
                                    <li className="mb-2 text-gray-600">
                                        <ScrollLink
                                            to="candidates"
                                            smooth={true}
                                            duration={500}
                                            offset={-90}
                                            className="cursor-pointer hover:text-purple-600"
                                        >
                                            Kandidat
                                        </ScrollLink>
                                    </li>
                                    <li className="mb-2 text-gray-600">
                                        <ScrollLink
                                            to="testimonials"
                                            smooth={true}
                                            duration={500}
                                            offset={-90}
                                            className="cursor-pointer hover:text-purple-600"
                                        >
                                            Testimoni
                                        </ScrollLink>
                                    </li>
                                </ul>
                            </div>

                            <div className="max-w-[284px] max-sm:max-w-full">
                                <h3 className="mb-5 text-lg font-semibold text-gray-900">
                                    Ikuti Kami
                                </h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>
                                        <a
                                            href="https://www.instagram.com/uinmlg/"
                                            className="hover:text-purple-600 hover:underline"
                                            target="_blank"
                                        >
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.youtube.com/@uinmlg"
                                            className="hover:text-purple-600 hover:underline"
                                            target="_blank"
                                        >
                                            YouTube
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.facebook.com/infoUINmaliki/"
                                            className="hover:text-purple-600 hover:underline"
                                            target="_blank"
                                        >
                                            Facebook
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-300 pt-8 text-center text-gray-600">
                            <p>
                                &copy; 2025 Pemilwa UIN Malang. All rights
                                reserved.
                            </p>
                        </div>
                    </div>
                </motion.footer>
            </div>
        </>
    );
}
