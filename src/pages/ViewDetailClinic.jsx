import { useEffect, useState } from "react";
import { getData } from "../utils/fetchData";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "../components/Star";
import { LuMail, LuMapPin, LuPhone, LuType } from "react-icons/lu";
import { CarouselSetUp } from "../components/Carousel";

const ViewDetailClinic = () => {
    const [clinic, setClinic] = useState({});
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const clinicId = urlParams.get("id");
                const clinicData = await getData(`/clinic/read?id=${clinicId}`);
                if (!clinicData.isSuccess) {
                    console.log(clinicData.message);
                    navigate("/error");
                }
                const imagesData = await getData(`/clinic/image?id=${clinicId}`);
                if (!imagesData.isSuccess) {
                    console.log(imagesData.message);
                    navigate("/error");
                }
                setClinic(clinicData.data);
                setImages(imagesData.data || []);
            } catch (error) {
                console.log(error);
                navigator("/error");
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="grid  grid-cols-5 auto pt-32 px-16">
                <div className="flex flex-col gap-8 p-8 col-span-2">
                    <div className="bg-white  p-8 rounded-md">
                        <div className="flex flex-col gap-2 items-center">
                            <img src={clinic.image} className="max-h-32 max-w-32" alt="lo go clinic" />
                            <span className="text-xl font-semibold text-primary">{clinic.name}</span>
                            <div className="flex gap-2 items-center">
                                <span className="font-semibold text-yellow-400">({clinic.star})</span>
                                <Star star={clinic.star} />
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex gap-2 items-center">
                                <span className="font-semibold">
                                    <LuMapPin className=" stroke-orange-200" />
                                </span>
                                <span className="text-base">{clinic.address}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="font-semibold">
                                    <LuPhone className=" stroke-orange-200" />
                                </span>
                                <span className="text-base">{clinic.phone}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="font-semibold">
                                    <LuMail className=" stroke-orange-200" />
                                </span>
                                <span className="text-base">{clinic.email}</span>
                            </div>

                            <div className="flex gap-2 items-center">
                                <span className="font-semibold">
                                    <LuType className=" stroke-orange-200" />
                                </span>
                                <span className="text-base">{clinic.type}</span>
                            </div>
                            <Link
                                to={`/hinh-thuc-dat-kham?id=${clinic.id}`}
                                className="border py-2 px-8 rounded-full border-primary bg-gradient-to-r from-primary-2 to-primary text-white font-semibold w-fit mx-auto hover:from-primary-3 hover:to-primary-2 transition-all">
                                Đặt khám ngay
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="py-8 px-16 col-span-3 overflow-hidden rounded-xl">
                    {images.length > 0 && (
                        <CarouselSetUp>
                            {images.map((src, index) => (
                                <img src={src} alt="image 1" className="h-full w-full object-cover rounded-xl" />
                            ))}
                        </CarouselSetUp>
                    )}
                </div>
            </div>
            <div className="grid  grid-cols-5 auto auto-rows-min px-16 mb-8">
                <div className="flex flex-col h-screen justify-between gap-8 px-8 col-span-2">
                    <div className="bg-white p-8 rounded-md">
                        <div className="text-lg font-semibold text-primary">Mô tả</div>
                        <div className="text-justify">{clinic.description}</div>
                    </div>
                    <div className="h-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1730982893444!5m2!1svi!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"></iframe>
                    </div>
                </div>
                <div className="col-span-3 max-h-screen text-justify h-auto overflow-hidden overflow-y-scroll no-scrollbar" dangerouslySetInnerHTML={{ __html: clinic.content }} />
            </div>
        </>
    );
};

export default ViewDetailClinic;
