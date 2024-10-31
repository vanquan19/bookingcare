import { CiCalendar, CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { Heading1, Heading2, Heading3, Heading6, Paragraph } from "../components/Text";
import { GoDotFill } from "react-icons/go";
import { LuMoveRight } from "react-icons/lu";
import { MainNewsCard, ListOtherNewsCard, SecondNewsCard, TopNewsCard, OtherNewsCard, ListTopNewsCard } from "../components/NewsComponents";
import { list } from "postcss";
import { Button } from "../components/Button";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const MainNewsPage = () => {
    const listNews = [
        {
            //form data for parent element
            id: 1,
            title: "Đi khám bệnh từ nửa đêm, cuộc đua giữa thời gian và sức khỏe",
            shortDescription:
                "Báo Tuổi Trẻ đưa tin, để kịp lấy số thứ tự khám tại các bệnh viện tuyến đầu TPHCM, nhiều người dân phải đi khám từ nửa đêm, đến sớm và trải chiếu nằm chờ, với hy vọng lấy được số nhỏ, kịp chuyến xe về quê. Trong bối cảnh này, việc sử dụng các ứng dụng đặt khám giúp giải quyết tình trạng chờ đợi, đơn giản hóa quy trình đi khám cho người dân. Tìm hiểu tiện ích đặt khám nhanh - lấy số trước tại đây!",
            type: "document",
            description: [
                "Mỗi đêm, hàng trăm ngàn người bệnh đổ về các bệnh viện lớn, trải chiếu nằm chờ từ nửa đêm đến giờ xếp hàng, lấy số thứ tự. Họ mang theo nỗi lo lắng về sức khỏe và hy vọng vào kết quả khám bệnh, nhưng phải đối mặt với những giờ phút chờ đợi mệt mỏi. Nhiều người bệnh và thân nhân, đặc biệt là những người ở các tỉnh xa như Cà Mau, Ninh Thuận phải thức dậy từ rất sớm, thậm chí là đi khám từ nửa đêm. Trước thực trạng này, ứng dụng đặt khám là một giải pháp thông minh. Trong số đó, Medpro nổi bật với giải pháp toàn diện, giúp người dân không cần phải đến bệnh viện từ sáng sớm, mang lại sự an tâm với hơn 200 cơ sở y tế trên toàn quốc.",
            ],
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1723958664719_3d444fc91d.png&w=1920&q=100",
            timestamp: "18/08/2024, 12:33",
            author: "Mộc Thanh",
            from: "Tin dịch vụ",
            // end form data for parent element

            ///form data for content element (get by id);
            content: [
                {
                    title: "Khó khăn của người bệnh khi đi khám từ nửa đêm",
                    type: "document",
                    description: [
                        "Theo bản tin phóng sự từ Báo Tuổi Trẻ, việc đi khám từ nửa đêm là viễn cảnh quen thuộc ở các bệnh viện công tuyến đầu TPHCM. Hàng đêm, khi nhiều người còn say giấc ngủ thì người bệnh và thân nhân đã thức dậy, di chuyển đến TPHCM để xếp hàng, chờ bốc số thứ tự khám bệnh. Khung cảnh quen thuộc này diễn ra hàng ngày tại các bệnh viện lớn như Chợ Rẫy, Bình Dân, Ung Bướu, BV Đại học Y Dược TPHCM,... Những người bệnh từ các tỉnh xa như Cà Mau hay Trà Vinh, phải vượt hàng trăm cây số, ngồi xe đò suốt nhiều giờ liền để có mặt tại bệnh viện khi trời còn chưa sáng.",
                    ],
                    content: [
                        {
                            title: "Hàng dài xếp hàng chờ lấy số trước bình minh",
                            type: "document",
                            description: [
                                "Trước bình minh, người bệnh đã xếp hàng dài chờ khám tại các bệnh viện lớn ở TP.HCM, ngồi trên ghế lạnh hoặc trải chiếu nằm đợi. Gương mặt họ hiện rõ sự mệt mỏi, đặc biệt là những người từ tỉnh xa. Cái lạnh của đêm không làm họ nản lòng, chỉ mong được khám sớm để tránh phải chờ đợi cả ngày.",
                                'Khi chỉ còn 30 phút nữa đến 0h giờ bốc số tại BV Chợ Rẫy, hàng người đã ngồi kín hơn nửa sảnh. Bà Thanh Tùng (54 tuổi, Ninh Thuận) chia sẻ: "Đi sớm vậy mà vẫn chưa phải người đến sớm nhất". Bà cũng nói thêm, chỉ cần một tiếng nữa, hàng người sẽ kéo dài hết hành lang.',
                                "Phóng viên Báo Tuổi Trẻ ghi nhận, những người quen thuộc với việc khám bệnh đã có kinh nghiệm, nhưng những người lần đầu từ quê lên thì gặp nhiều khó khăn. Một số người bệnh đã đến BV Ung Bướu từ 23h nhưng phải đứng chờ ngoài cổng vì 2h30 mới mở. Tại BV Bình Dân, dù vừa hơn 0h, số thứ tự đã lên đến 18.",
                            ],
                            image: {
                                link: "https://cdn.medpro.vn/medpro-production/medpro/topics/nguoi-dan-xep-hang-luc-0gio-tai-bv-cho-ray.jpeg",
                                description: "Người dân xếp hàng chơ bốc số lúc 0h tại BV Chợ Rẫy. Nguồn: Báo Tuổi Trẻ",
                            },
                        },
                        {
                            title: "Thời gian và chi phí - Bài toán khó cho người bệnh",
                            type: "document",
                            description: [
                                'Thời gian chờ đợi không chỉ là thử thách về thể chất mà còn gây áp lực tinh thần, đặc biệt với những người từ xa đến TP.HCM khám bệnh. Để tiết kiệm chi phí, nhiều người không thuê phòng nghỉ, mang theo đồ ăn tự chuẩn bị và nằm đợi ở sảnh. Mỗi chuyến khám bệnh là một cuộc "đánh cược" với sức khỏe và tài chính gia đình.',
                                'Một người đàn ông từ xã Đông Hải, huyện Duyên Hải, chia sẻ rằng dù đã tính toán để đến đúng giờ BV Bình Dân phát số, anh vẫn chỉ lấy được số 19. Lần trước, anh chờ đến trưa mới được khám vì lấy số 28. Anh than thở: “Bệnh tật không mệt bằng việc đi đi về về mấy trăm cây số. Hy vọng lần này mổ xong luôn để khỏi phải tái khám".',
                                'Bà Xuân, bị suy thận hai năm, đã quen với cảnh đi khám từ nữa đêm. Khi con bà cầm phiếu số 106, bà không giấu nổi sự buồn bã, biết rằng có thể phải chờ đến hôm sau. Sau khi lấy số, hai mẹ con tìm chỗ ngủ trong khu vực đã kín người, cố gắng tiết kiệm tối đa bằng cách mang theo đồ ăn và không thuê trọ. Bà nói: “Còn phải đi khám dài dài, cố mà tiết kiệm, đói thì ăn cơm cháy rồi uống nước, về nhà mới ăn uống thoải mái được".',
                            ],
                            image: {
                                link: "https://cdn.medpro.vn/medpro-production/medpro/topics/nguoi-dan-trai-chieu-nam-tai-bv.jpeg",
                                description: "Người dân trải chiếu nằm chờ ở sảnh bệnh viện để tiết kiệm chi phí. Nguồn: Báo Tuổi Trẻ",
                            },
                        },
                    ],
                },
                {
                    title: "Ứng dụng đặt khám - Giải pháp y tế số, kết nối người dân với các bệnh viện hàng đầu",
                    type: "document",
                    description: [
                        "Trước những khó khăn và bất tiện trong quá trình khám chữa bệnh, đặt khám qua App (ứng dụng) đã xuất hiện như một giải pháp tối ưu, giúp người bệnh tiết kiệm thời gian và chi phí. Những ứng dụng này không chỉ cho phép đặt lịch khám mà còn giúp lấy số thứ tự trước, tránh tình trạng phải đi từ nửa đêm và chờ đợi lâu.",
                        "Trong xu hướng chuyển đổi số, Medpro nổi bật là một trong những ứng dụng hàng đầu trong lĩnh vực y tế số, cho phép đặt lịch khám tại hơn 200 cơ sở y tế trên toàn quốc. Ứng dụng này mang đến nhiều tiện ích như nhắc nhở lịch hẹn, hỗ trợ thanh toán trực tuyến, và tư vấn sức khỏe qua video với bác sĩ chuyên khoa. Người dùng chỉ cần đặt lịch và đến thẳng phòng khám, giúp rút ngắn quy trình và tiết kiệm thời gian đáng kể",
                        "Medpro không chỉ phổ biến trên Apple Store và Google Play mà còn được đông đảo người dùng tin tưởng. Hiện Medpro là đối tác chiến lược của nhiều bệnh viện lớn như Bệnh viện Đại học Y Dược TPHCM, Chợ Rẫy, Nhi đồng 1, Bệnh viện Mắt, Da liễu TPHCM,... Với phương châm vì sức khỏe cộng đồng, Medpro đang không ngừng nâng cao chất lượng dịch vụ y tế, giảm bớt gánh nặng cho người bệnh và trở thành người bạn đồng hành đáng tin cậy trong hành trình chăm sóc sức khỏe.",
                        "Đặt khám trên 200 cơ sở y tế trên toàn quốc: https://medpro.vn/co-so-y-te",
                    ],
                    image: "https://cdn.medpro.vn/medpro-production/medpro/topics/mang-luoi-ket-noi-200-csyt-medpro.jpeg",
                },
                {
                    title: "Kết luận",
                    type: "document",
                    description: [
                        "Trong bối cảnh những khó khăn và bất tiện khi đi khám bệnh giữa đêm khuya vẫn còn hiện hữu, việc sử dụng các ứng dụng đặt khám không chỉ mang lại sự tiện lợi mà còn giúp cải thiện đáng kể chất lượng cuộc sống cho người bệnh. Thay vì phải đi khám từ nửa đêm và chờ đợi mệt mỏi, người bệnh giờ đây có thể dễ dàng đặt khám nhanh - lấy số trước, tiết kiệm thời gian và chi phí. Với sự đồng hành của Medpro, người bệnh có thể yên tâm hơn trong hành trình chăm sóc sức khỏe, từ đó tập trung vào việc điều trị và phục hồi, không còn bị gánh nặng bởi những khó khăn trong việc khám chữa bệnh.",
                    ],
                    image: "https://cdn.medpro.vn/medpro-production/medpro/topics/mang-luoi-ket-noi-200-csyt-medpro.jpeg",
                    content: {
                        title: "Nguồn",
                        type: "number",
                        description: [
                            "Thông tin về việc người bệnh đi khám từ nửa đêm, xếp hàng dài tại các bệnh viện - Báo Tuổi Trẻ Online: https://tuoitre.vn/di-kham-benh-luc-nua-dem-20240808100358225.htm",
                        ],
                    },
                },
            ],
        },
        {
            //form data for parent element
            id: 2,
            title: "Đi khám bệnh từ nửa đêm, cuộc đua giữa thời gian và sức khỏe",
            shortDescription:
                "Báo Tuổi Trẻ đưa tin, để kịp lấy số thứ tự khám tại các bệnh viện tuyến đầu TPHCM, nhiều người dân phải đi khám từ nửa đêm, đến sớm và trải chiếu nằm chờ, với hy vọng lấy được số nhỏ, kịp chuyến xe về quê. Trong bối cảnh này, việc sử dụng các ứng dụng đặt khám giúp giải quyết tình trạng chờ đợi, đơn giản hóa quy trình đi khám cho người dân. Tìm hiểu tiện ích đặt khám nhanh - lấy số trước tại đây!",
            type: "document",
            description: [
                "Mỗi đêm, hàng trăm ngàn người bệnh đổ về các bệnh viện lớn, trải chiếu nằm chờ từ nửa đêm đến giờ xếp hàng, lấy số thứ tự. Họ mang theo nỗi lo lắng về sức khỏe và hy vọng vào kết quả khám bệnh, nhưng phải đối mặt với những giờ phút chờ đợi mệt mỏi. Nhiều người bệnh và thân nhân, đặc biệt là những người ở các tỉnh xa như Cà Mau, Ninh Thuận phải thức dậy từ rất sớm, thậm chí là đi khám từ nửa đêm. Trước thực trạng này, ứng dụng đặt khám là một giải pháp thông minh. Trong số đó, Medpro nổi bật với giải pháp toàn diện, giúp người dân không cần phải đến bệnh viện từ sáng sớm, mang lại sự an tâm với hơn 200 cơ sở y tế trên toàn quốc.",
            ],
            image: "https://cdn.medpro.vn/medpro-production/medpro/topics/dieu-tri-cho-tre-benh-soi-tai-bv-nhi-dong-1.jpg",
            timestamp: "18/08/2024, 12:33",
            author: "Mộc Thanh",
            from: "Tin dịch vụ",
            // end form data for parent element

            ///form data for content element (get by id);
            content: [
                {
                    title: "Khó khăn của người bệnh khi đi khám từ nửa đêm",
                    type: "document",
                    description: [
                        "Theo bản tin phóng sự từ Báo Tuổi Trẻ, việc đi khám từ nửa đêm là viễn cảnh quen thuộc ở các bệnh viện công tuyến đầu TPHCM. Hàng đêm, khi nhiều người còn say giấc ngủ thì người bệnh và thân nhân đã thức dậy, di chuyển đến TPHCM để xếp hàng, chờ bốc số thứ tự khám bệnh. Khung cảnh quen thuộc này diễn ra hàng ngày tại các bệnh viện lớn như Chợ Rẫy, Bình Dân, Ung Bướu, BV Đại học Y Dược TPHCM,... Những người bệnh từ các tỉnh xa như Cà Mau hay Trà Vinh, phải vượt hàng trăm cây số, ngồi xe đò suốt nhiều giờ liền để có mặt tại bệnh viện khi trời còn chưa sáng.",
                    ],
                    content: [
                        {
                            title: "Hàng dài xếp hàng chờ lấy số trước bình minh",
                            type: "document",
                            description: [
                                "Trước bình minh, người bệnh đã xếp hàng dài chờ khám tại các bệnh viện lớn ở TP.HCM, ngồi trên ghế lạnh hoặc trải chiếu nằm đợi. Gương mặt họ hiện rõ sự mệt mỏi, đặc biệt là những người từ tỉnh xa. Cái lạnh của đêm không làm họ nản lòng, chỉ mong được khám sớm để tránh phải chờ đợi cả ngày.",
                                'Khi chỉ còn 30 phút nữa đến 0h giờ bốc số tại BV Chợ Rẫy, hàng người đã ngồi kín hơn nửa sảnh. Bà Thanh Tùng (54 tuổi, Ninh Thuận) chia sẻ: "Đi sớm vậy mà vẫn chưa phải người đến sớm nhất". Bà cũng nói thêm, chỉ cần một tiếng nữa, hàng người sẽ kéo dài hết hành lang.',
                                "Phóng viên Báo Tuổi Trẻ ghi nhận, những người quen thuộc với việc khám bệnh đã có kinh nghiệm, nhưng những người lần đầu từ quê lên thì gặp nhiều khó khăn. Một số người bệnh đã đến BV Ung Bướu từ 23h nhưng phải đứng chờ ngoài cổng vì 2h30 mới mở. Tại BV Bình Dân, dù vừa hơn 0h, số thứ tự đã lên đến 18.",
                            ],
                            image: {
                                link: "https://cdn.medpro.vn/medpro-production/medpro/topics/nguoi-dan-xep-hang-luc-0gio-tai-bv-cho-ray.jpeg",
                                description: "Người dân xếp hàng chơ bốc số lúc 0h tại BV Chợ Rẫy. Nguồn: Báo Tuổi Trẻ",
                            },
                        },
                        {
                            title: "Thời gian và chi phí - Bài toán khó cho người bệnh",
                            type: "document",
                            description: [
                                'Thời gian chờ đợi không chỉ là thử thách về thể chất mà còn gây áp lực tinh thần, đặc biệt với những người từ xa đến TP.HCM khám bệnh. Để tiết kiệm chi phí, nhiều người không thuê phòng nghỉ, mang theo đồ ăn tự chuẩn bị và nằm đợi ở sảnh. Mỗi chuyến khám bệnh là một cuộc "đánh cược" với sức khỏe và tài chính gia đình.',
                                'Một người đàn ông từ xã Đông Hải, huyện Duyên Hải, chia sẻ rằng dù đã tính toán để đến đúng giờ BV Bình Dân phát số, anh vẫn chỉ lấy được số 19. Lần trước, anh chờ đến trưa mới được khám vì lấy số 28. Anh than thở: “Bệnh tật không mệt bằng việc đi đi về về mấy trăm cây số. Hy vọng lần này mổ xong luôn để khỏi phải tái khám".',
                                'Bà Xuân, bị suy thận hai năm, đã quen với cảnh đi khám từ nữa đêm. Khi con bà cầm phiếu số 106, bà không giấu nổi sự buồn bã, biết rằng có thể phải chờ đến hôm sau. Sau khi lấy số, hai mẹ con tìm chỗ ngủ trong khu vực đã kín người, cố gắng tiết kiệm tối đa bằng cách mang theo đồ ăn và không thuê trọ. Bà nói: “Còn phải đi khám dài dài, cố mà tiết kiệm, đói thì ăn cơm cháy rồi uống nước, về nhà mới ăn uống thoải mái được".',
                            ],
                            image: {
                                link: "https://cdn.medpro.vn/medpro-production/medpro/topics/nguoi-dan-trai-chieu-nam-tai-bv.jpeg",
                                description: "Người dân trải chiếu nằm chờ ở sảnh bệnh viện để tiết kiệm chi phí. Nguồn: Báo Tuổi Trẻ",
                            },
                        },
                    ],
                },
                {
                    title: "Ứng dụng đặt khám - Giải pháp y tế số, kết nối người dân với các bệnh viện hàng đầu",
                    type: "document",
                    description: [
                        "Trước những khó khăn và bất tiện trong quá trình khám chữa bệnh, đặt khám qua App (ứng dụng) đã xuất hiện như một giải pháp tối ưu, giúp người bệnh tiết kiệm thời gian và chi phí. Những ứng dụng này không chỉ cho phép đặt lịch khám mà còn giúp lấy số thứ tự trước, tránh tình trạng phải đi từ nửa đêm và chờ đợi lâu.",
                        "Trong xu hướng chuyển đổi số, Medpro nổi bật là một trong những ứng dụng hàng đầu trong lĩnh vực y tế số, cho phép đặt lịch khám tại hơn 200 cơ sở y tế trên toàn quốc. Ứng dụng này mang đến nhiều tiện ích như nhắc nhở lịch hẹn, hỗ trợ thanh toán trực tuyến, và tư vấn sức khỏe qua video với bác sĩ chuyên khoa. Người dùng chỉ cần đặt lịch và đến thẳng phòng khám, giúp rút ngắn quy trình và tiết kiệm thời gian đáng kể",
                        "Medpro không chỉ phổ biến trên Apple Store và Google Play mà còn được đông đảo người dùng tin tưởng. Hiện Medpro là đối tác chiến lược của nhiều bệnh viện lớn như Bệnh viện Đại học Y Dược TPHCM, Chợ Rẫy, Nhi đồng 1, Bệnh viện Mắt, Da liễu TPHCM,... Với phương châm vì sức khỏe cộng đồng, Medpro đang không ngừng nâng cao chất lượng dịch vụ y tế, giảm bớt gánh nặng cho người bệnh và trở thành người bạn đồng hành đáng tin cậy trong hành trình chăm sóc sức khỏe.",
                        "Đặt khám trên 200 cơ sở y tế trên toàn quốc: https://medpro.vn/co-so-y-te",
                    ],
                    image: "https://cdn.medpro.vn/medpro-production/medpro/topics/mang-luoi-ket-noi-200-csyt-medpro.jpeg",
                },
                {
                    title: "Kết luận",
                    type: "document",
                    description: [
                        "Trong bối cảnh những khó khăn và bất tiện khi đi khám bệnh giữa đêm khuya vẫn còn hiện hữu, việc sử dụng các ứng dụng đặt khám không chỉ mang lại sự tiện lợi mà còn giúp cải thiện đáng kể chất lượng cuộc sống cho người bệnh. Thay vì phải đi khám từ nửa đêm và chờ đợi mệt mỏi, người bệnh giờ đây có thể dễ dàng đặt khám nhanh - lấy số trước, tiết kiệm thời gian và chi phí. Với sự đồng hành của Medpro, người bệnh có thể yên tâm hơn trong hành trình chăm sóc sức khỏe, từ đó tập trung vào việc điều trị và phục hồi, không còn bị gánh nặng bởi những khó khăn trong việc khám chữa bệnh.",
                    ],
                    image: "https://cdn.medpro.vn/medpro-production/medpro/topics/mang-luoi-ket-noi-200-csyt-medpro.jpeg",
                    content: {
                        title: "Nguồn",
                        type: "number",
                        description: [
                            "Thông tin về việc người bệnh đi khám từ nửa đêm, xếp hàng dài tại các bệnh viện - Báo Tuổi Trẻ Online: https://tuoitre.vn/di-kham-benh-luc-nua-dem-20240808100358225.htm",
                        ],
                    },
                },
            ],
        },
        {
            //form data for parent element
            id: 3,
            title: "Đi khám bệnh từ nửa đêm, cuộc đua giữa thời gian và sức khỏe",
            shortDescription:
                "Báo Tuổi Trẻ đưa tin, để kịp lấy số thứ tự khám tại các bệnh viện tuyến đầu TPHCM, nhiều người dân phải đi khám từ nửa đêm, đến sớm và trải chiếu nằm chờ, với hy vọng lấy được số nhỏ, kịp chuyến xe về quê. Trong bối cảnh này, việc sử dụng các ứng dụng đặt khám giúp giải quyết tình trạng chờ đợi, đơn giản hóa quy trình đi khám cho người dân. Tìm hiểu tiện ích đặt khám nhanh - lấy số trước tại đây!",
            type: "document",
            description: [
                "Mỗi đêm, hàng trăm ngàn người bệnh đổ về các bệnh viện lớn, trải chiếu nằm chờ từ nửa đêm đến giờ xếp hàng, lấy số thứ tự. Họ mang theo nỗi lo lắng về sức khỏe và hy vọng vào kết quả khám bệnh, nhưng phải đối mặt với những giờ phút chờ đợi mệt mỏi. Nhiều người bệnh và thân nhân, đặc biệt là những người ở các tỉnh xa như Cà Mau, Ninh Thuận phải thức dậy từ rất sớm, thậm chí là đi khám từ nửa đêm. Trước thực trạng này, ứng dụng đặt khám là một giải pháp thông minh. Trong số đó, Medpro nổi bật với giải pháp toàn diện, giúp người dân không cần phải đến bệnh viện từ sáng sớm, mang lại sự an tâm với hơn 200 cơ sở y tế trên toàn quốc.",
            ],
            image: "https://cdn.medpro.vn/medpro-production/medpro/topics/dieu-tri-cho-tre-benh-soi-tai-bv-nhi-dong-1.jpg",
            timestamp: "18/08/2024, 12:33",
            author: "Mộc Thanh",
            from: "Tin dịch vụ",
            // end form data for parent element

            ///form data for content element (get by id);
            content: [
                {
                    title: "Khó khăn của người bệnh khi đi khám từ nửa đêm",
                    type: "document",
                    description: [
                        "Theo bản tin phóng sự từ Báo Tuổi Trẻ, việc đi khám từ nửa đêm là viễn cảnh quen thuộc ở các bệnh viện công tuyến đầu TPHCM. Hàng đêm, khi nhiều người còn say giấc ngủ thì người bệnh và thân nhân đã thức dậy, di chuyển đến TPHCM để xếp hàng, chờ bốc số thứ tự khám bệnh. Khung cảnh quen thuộc này diễn ra hàng ngày tại các bệnh viện lớn như Chợ Rẫy, Bình Dân, Ung Bướu, BV Đại học Y Dược TPHCM,... Những người bệnh từ các tỉnh xa như Cà Mau hay Trà Vinh, phải vượt hàng trăm cây số, ngồi xe đò suốt nhiều giờ liền để có mặt tại bệnh viện khi trời còn chưa sáng.",
                    ],
                    content: [
                        {
                            title: "Hàng dài xếp hàng chờ lấy số trước bình minh",
                            type: "document",
                            description: [
                                "Trước bình minh, người bệnh đã xếp hàng dài chờ khám tại các bệnh viện lớn ở TP.HCM, ngồi trên ghế lạnh hoặc trải chiếu nằm đợi. Gương mặt họ hiện rõ sự mệt mỏi, đặc biệt là những người từ tỉnh xa. Cái lạnh của đêm không làm họ nản lòng, chỉ mong được khám sớm để tránh phải chờ đợi cả ngày.",
                                'Khi chỉ còn 30 phút nữa đến 0h giờ bốc số tại BV Chợ Rẫy, hàng người đã ngồi kín hơn nửa sảnh. Bà Thanh Tùng (54 tuổi, Ninh Thuận) chia sẻ: "Đi sớm vậy mà vẫn chưa phải người đến sớm nhất". Bà cũng nói thêm, chỉ cần một tiếng nữa, hàng người sẽ kéo dài hết hành lang.',
                                "Phóng viên Báo Tuổi Trẻ ghi nhận, những người quen thuộc với việc khám bệnh đã có kinh nghiệm, nhưng những người lần đầu từ quê lên thì gặp nhiều khó khăn. Một số người bệnh đã đến BV Ung Bướu từ 23h nhưng phải đứng chờ ngoài cổng vì 2h30 mới mở. Tại BV Bình Dân, dù vừa hơn 0h, số thứ tự đã lên đến 18.",
                            ],
                            image: {
                                link: "https://cdn.medpro.vn/medpro-production/medpro/topics/nguoi-dan-xep-hang-luc-0gio-tai-bv-cho-ray.jpeg",
                                description: "Người dân xếp hàng chơ bốc số lúc 0h tại BV Chợ Rẫy. Nguồn: Báo Tuổi Trẻ",
                            },
                        },
                        {
                            title: "Thời gian và chi phí - Bài toán khó cho người bệnh",
                            type: "document",
                            description: [
                                'Thời gian chờ đợi không chỉ là thử thách về thể chất mà còn gây áp lực tinh thần, đặc biệt với những người từ xa đến TP.HCM khám bệnh. Để tiết kiệm chi phí, nhiều người không thuê phòng nghỉ, mang theo đồ ăn tự chuẩn bị và nằm đợi ở sảnh. Mỗi chuyến khám bệnh là một cuộc "đánh cược" với sức khỏe và tài chính gia đình.',
                                'Một người đàn ông từ xã Đông Hải, huyện Duyên Hải, chia sẻ rằng dù đã tính toán để đến đúng giờ BV Bình Dân phát số, anh vẫn chỉ lấy được số 19. Lần trước, anh chờ đến trưa mới được khám vì lấy số 28. Anh than thở: “Bệnh tật không mệt bằng việc đi đi về về mấy trăm cây số. Hy vọng lần này mổ xong luôn để khỏi phải tái khám".',
                                'Bà Xuân, bị suy thận hai năm, đã quen với cảnh đi khám từ nữa đêm. Khi con bà cầm phiếu số 106, bà không giấu nổi sự buồn bã, biết rằng có thể phải chờ đến hôm sau. Sau khi lấy số, hai mẹ con tìm chỗ ngủ trong khu vực đã kín người, cố gắng tiết kiệm tối đa bằng cách mang theo đồ ăn và không thuê trọ. Bà nói: “Còn phải đi khám dài dài, cố mà tiết kiệm, đói thì ăn cơm cháy rồi uống nước, về nhà mới ăn uống thoải mái được".',
                            ],
                            image: {
                                link: "https://cdn.medpro.vn/medpro-production/medpro/topics/nguoi-dan-trai-chieu-nam-tai-bv.jpeg",
                                description: "Người dân trải chiếu nằm chờ ở sảnh bệnh viện để tiết kiệm chi phí. Nguồn: Báo Tuổi Trẻ",
                            },
                        },
                    ],
                },
                {
                    title: "Ứng dụng đặt khám - Giải pháp y tế số, kết nối người dân với các bệnh viện hàng đầu",
                    type: "document",
                    description: [
                        "Trước những khó khăn và bất tiện trong quá trình khám chữa bệnh, đặt khám qua App (ứng dụng) đã xuất hiện như một giải pháp tối ưu, giúp người bệnh tiết kiệm thời gian và chi phí. Những ứng dụng này không chỉ cho phép đặt lịch khám mà còn giúp lấy số thứ tự trước, tránh tình trạng phải đi từ nửa đêm và chờ đợi lâu.",
                        "Trong xu hướng chuyển đổi số, Medpro nổi bật là một trong những ứng dụng hàng đầu trong lĩnh vực y tế số, cho phép đặt lịch khám tại hơn 200 cơ sở y tế trên toàn quốc. Ứng dụng này mang đến nhiều tiện ích như nhắc nhở lịch hẹn, hỗ trợ thanh toán trực tuyến, và tư vấn sức khỏe qua video với bác sĩ chuyên khoa. Người dùng chỉ cần đặt lịch và đến thẳng phòng khám, giúp rút ngắn quy trình và tiết kiệm thời gian đáng kể",
                        "Medpro không chỉ phổ biến trên Apple Store và Google Play mà còn được đông đảo người dùng tin tưởng. Hiện Medpro là đối tác chiến lược của nhiều bệnh viện lớn như Bệnh viện Đại học Y Dược TPHCM, Chợ Rẫy, Nhi đồng 1, Bệnh viện Mắt, Da liễu TPHCM,... Với phương châm vì sức khỏe cộng đồng, Medpro đang không ngừng nâng cao chất lượng dịch vụ y tế, giảm bớt gánh nặng cho người bệnh và trở thành người bạn đồng hành đáng tin cậy trong hành trình chăm sóc sức khỏe.",
                        "Đặt khám trên 200 cơ sở y tế trên toàn quốc: https://medpro.vn/co-so-y-te",
                    ],
                    image: "https://cdn.medpro.vn/medpro-production/medpro/topics/mang-luoi-ket-noi-200-csyt-medpro.jpeg",
                },
                {
                    title: "Kết luận",
                    type: "document",
                    description: [
                        "Trong bối cảnh những khó khăn và bất tiện khi đi khám bệnh giữa đêm khuya vẫn còn hiện hữu, việc sử dụng các ứng dụng đặt khám không chỉ mang lại sự tiện lợi mà còn giúp cải thiện đáng kể chất lượng cuộc sống cho người bệnh. Thay vì phải đi khám từ nửa đêm và chờ đợi mệt mỏi, người bệnh giờ đây có thể dễ dàng đặt khám nhanh - lấy số trước, tiết kiệm thời gian và chi phí. Với sự đồng hành của Medpro, người bệnh có thể yên tâm hơn trong hành trình chăm sóc sức khỏe, từ đó tập trung vào việc điều trị và phục hồi, không còn bị gánh nặng bởi những khó khăn trong việc khám chữa bệnh.",
                    ],
                    image: "https://cdn.medpro.vn/medpro-production/medpro/topics/mang-luoi-ket-noi-200-csyt-medpro.jpeg",
                    content: {
                        title: "Nguồn",
                        type: "number",
                        description: [
                            "Thông tin về việc người bệnh đi khám từ nửa đêm, xếp hàng dài tại các bệnh viện - Báo Tuổi Trẻ Online: https://tuoitre.vn/di-kham-benh-luc-nua-dem-20240808100358225.htm",
                        ],
                    },
                },
            ],
        },
        {
            //form data for parent element
            id: 4,
            title: "Đi khám bệnh từ nửa đêm, cuộc đua giữa thời gian và sức khỏe",
            shortDescription:
                "Báo Tuổi Trẻ đưa tin, để kịp lấy số thứ tự khám tại các bệnh viện tuyến đầu TPHCM, nhiều người dân phải đi khám từ nửa đêm, đến sớm và trải chiếu nằm chờ, với hy vọng lấy được số nhỏ, kịp chuyến xe về quê. Trong bối cảnh này, việc sử dụng các ứng dụng đặt khám giúp giải quyết tình trạng chờ đợi, đơn giản hóa quy trình đi khám cho người dân. Tìm hiểu tiện ích đặt khám nhanh - lấy số trước tại đây!",
            type: "document",
            description: [
                "Mỗi đêm, hàng trăm ngàn người bệnh đổ về các bệnh viện lớn, trải chiếu nằm chờ từ nửa đêm đến giờ xếp hàng, lấy số thứ tự. Họ mang theo nỗi lo lắng về sức khỏe và hy vọng vào kết quả khám bệnh, nhưng phải đối mặt với những giờ phút chờ đợi mệt mỏi. Nhiều người bệnh và thân nhân, đặc biệt là những người ở các tỉnh xa như Cà Mau, Ninh Thuận phải thức dậy từ rất sớm, thậm chí là đi khám từ nửa đêm. Trước thực trạng này, ứng dụng đặt khám là một giải pháp thông minh. Trong số đó, Medpro nổi bật với giải pháp toàn diện, giúp người dân không cần phải đến bệnh viện từ sáng sớm, mang lại sự an tâm với hơn 200 cơ sở y tế trên toàn quốc.",
            ],
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1723958664719_3d444fc91d.png&w=1920&q=100",
            timestamp: "18/08/2024, 12:33",
            author: "Mộc Thanh",
            from: "Tin dịch vụ",
            // end form data for parent element

            ///form data for content element (get by id);
            content: [
                {
                    title: "Khó khăn của người bệnh khi đi khám từ nửa đêm",
                    type: "document",
                    description: [
                        "Theo bản tin phóng sự từ Báo Tuổi Trẻ, việc đi khám từ nửa đêm là viễn cảnh quen thuộc ở các bệnh viện công tuyến đầu TPHCM. Hàng đêm, khi nhiều người còn say giấc ngủ thì người bệnh và thân nhân đã thức dậy, di chuyển đến TPHCM để xếp hàng, chờ bốc số thứ tự khám bệnh. Khung cảnh quen thuộc này diễn ra hàng ngày tại các bệnh viện lớn như Chợ Rẫy, Bình Dân, Ung Bướu, BV Đại học Y Dược TPHCM,... Những người bệnh từ các tỉnh xa như Cà Mau hay Trà Vinh, phải vượt hàng trăm cây số, ngồi xe đò suốt nhiều giờ liền để có mặt tại bệnh viện khi trời còn chưa sáng.",
                    ],
                    content: [
                        {
                            title: "Hàng dài xếp hàng chờ lấy số trước bình minh",
                            type: "document",
                            description: [
                                "Trước bình minh, người bệnh đã xếp hàng dài chờ khám tại các bệnh viện lớn ở TP.HCM, ngồi trên ghế lạnh hoặc trải chiếu nằm đợi. Gương mặt họ hiện rõ sự mệt mỏi, đặc biệt là những người từ tỉnh xa. Cái lạnh của đêm không làm họ nản lòng, chỉ mong được khám sớm để tránh phải chờ đợi cả ngày.",
                                'Khi chỉ còn 30 phút nữa đến 0h giờ bốc số tại BV Chợ Rẫy, hàng người đã ngồi kín hơn nửa sảnh. Bà Thanh Tùng (54 tuổi, Ninh Thuận) chia sẻ: "Đi sớm vậy mà vẫn chưa phải người đến sớm nhất". Bà cũng nói thêm, chỉ cần một tiếng nữa, hàng người sẽ kéo dài hết hành lang.',
                                "Phóng viên Báo Tuổi Trẻ ghi nhận, những người quen thuộc với việc khám bệnh đã có kinh nghiệm, nhưng những người lần đầu từ quê lên thì gặp nhiều khó khăn. Một số người bệnh đã đến BV Ung Bướu từ 23h nhưng phải đứng chờ ngoài cổng vì 2h30 mới mở. Tại BV Bình Dân, dù vừa hơn 0h, số thứ tự đã lên đến 18.",
                            ],
                            image: {
                                link: "https://cdn.medpro.vn/medpro-production/medpro/topics/nguoi-dan-xep-hang-luc-0gio-tai-bv-cho-ray.jpeg",
                                description: "Người dân xếp hàng chơ bốc số lúc 0h tại BV Chợ Rẫy. Nguồn: Báo Tuổi Trẻ",
                            },
                        },
                        {
                            title: "Thời gian và chi phí - Bài toán khó cho người bệnh",
                            type: "document",
                            description: [
                                'Thời gian chờ đợi không chỉ là thử thách về thể chất mà còn gây áp lực tinh thần, đặc biệt với những người từ xa đến TP.HCM khám bệnh. Để tiết kiệm chi phí, nhiều người không thuê phòng nghỉ, mang theo đồ ăn tự chuẩn bị và nằm đợi ở sảnh. Mỗi chuyến khám bệnh là một cuộc "đánh cược" với sức khỏe và tài chính gia đình.',
                                'Một người đàn ông từ xã Đông Hải, huyện Duyên Hải, chia sẻ rằng dù đã tính toán để đến đúng giờ BV Bình Dân phát số, anh vẫn chỉ lấy được số 19. Lần trước, anh chờ đến trưa mới được khám vì lấy số 28. Anh than thở: “Bệnh tật không mệt bằng việc đi đi về về mấy trăm cây số. Hy vọng lần này mổ xong luôn để khỏi phải tái khám".',
                                'Bà Xuân, bị suy thận hai năm, đã quen với cảnh đi khám từ nữa đêm. Khi con bà cầm phiếu số 106, bà không giấu nổi sự buồn bã, biết rằng có thể phải chờ đến hôm sau. Sau khi lấy số, hai mẹ con tìm chỗ ngủ trong khu vực đã kín người, cố gắng tiết kiệm tối đa bằng cách mang theo đồ ăn và không thuê trọ. Bà nói: “Còn phải đi khám dài dài, cố mà tiết kiệm, đói thì ăn cơm cháy rồi uống nước, về nhà mới ăn uống thoải mái được".',
                            ],
                            image: {
                                link: "https://cdn.medpro.vn/medpro-production/medpro/topics/nguoi-dan-trai-chieu-nam-tai-bv.jpeg",
                                description: "Người dân trải chiếu nằm chờ ở sảnh bệnh viện để tiết kiệm chi phí. Nguồn: Báo Tuổi Trẻ",
                            },
                        },
                    ],
                },
                {
                    title: "Ứng dụng đặt khám - Giải pháp y tế số, kết nối người dân với các bệnh viện hàng đầu",
                    type: "document",
                    description: [
                        "Trước những khó khăn và bất tiện trong quá trình khám chữa bệnh, đặt khám qua App (ứng dụng) đã xuất hiện như một giải pháp tối ưu, giúp người bệnh tiết kiệm thời gian và chi phí. Những ứng dụng này không chỉ cho phép đặt lịch khám mà còn giúp lấy số thứ tự trước, tránh tình trạng phải đi từ nửa đêm và chờ đợi lâu.",
                        "Trong xu hướng chuyển đổi số, Medpro nổi bật là một trong những ứng dụng hàng đầu trong lĩnh vực y tế số, cho phép đặt lịch khám tại hơn 200 cơ sở y tế trên toàn quốc. Ứng dụng này mang đến nhiều tiện ích như nhắc nhở lịch hẹn, hỗ trợ thanh toán trực tuyến, và tư vấn sức khỏe qua video với bác sĩ chuyên khoa. Người dùng chỉ cần đặt lịch và đến thẳng phòng khám, giúp rút ngắn quy trình và tiết kiệm thời gian đáng kể",
                        "Medpro không chỉ phổ biến trên Apple Store và Google Play mà còn được đông đảo người dùng tin tưởng. Hiện Medpro là đối tác chiến lược của nhiều bệnh viện lớn như Bệnh viện Đại học Y Dược TPHCM, Chợ Rẫy, Nhi đồng 1, Bệnh viện Mắt, Da liễu TPHCM,... Với phương châm vì sức khỏe cộng đồng, Medpro đang không ngừng nâng cao chất lượng dịch vụ y tế, giảm bớt gánh nặng cho người bệnh và trở thành người bạn đồng hành đáng tin cậy trong hành trình chăm sóc sức khỏe.",
                        "Đặt khám trên 200 cơ sở y tế trên toàn quốc: https://medpro.vn/co-so-y-te",
                    ],
                    image: "https://cdn.medpro.vn/medpro-production/medpro/topics/mang-luoi-ket-noi-200-csyt-medpro.jpeg",
                },
                {
                    title: "Kết luận",
                    type: "document",
                    description: [
                        "Trong bối cảnh những khó khăn và bất tiện khi đi khám bệnh giữa đêm khuya vẫn còn hiện hữu, việc sử dụng các ứng dụng đặt khám không chỉ mang lại sự tiện lợi mà còn giúp cải thiện đáng kể chất lượng cuộc sống cho người bệnh. Thay vì phải đi khám từ nửa đêm và chờ đợi mệt mỏi, người bệnh giờ đây có thể dễ dàng đặt khám nhanh - lấy số trước, tiết kiệm thời gian và chi phí. Với sự đồng hành của Medpro, người bệnh có thể yên tâm hơn trong hành trình chăm sóc sức khỏe, từ đó tập trung vào việc điều trị và phục hồi, không còn bị gánh nặng bởi những khó khăn trong việc khám chữa bệnh.",
                    ],
                    image: "https://cdn.medpro.vn/medpro-production/medpro/topics/mang-luoi-ket-noi-200-csyt-medpro.jpeg",
                    content: {
                        title: "Nguồn",
                        type: "number",
                        description: [
                            "Thông tin về việc người bệnh đi khám từ nửa đêm, xếp hàng dài tại các bệnh viện - Báo Tuổi Trẻ Online: https://tuoitre.vn/di-kham-benh-luc-nua-dem-20240808100358225.htm",
                        ],
                    },
                },
            ],
        },
        {
            //form data for parent element
            id: 5,
            title: "Đi khám bệnh từ nửa đêm, cuộc đua giữa thời gian và sức khỏe",
            shortDescription:
                "Báo Tuổi Trẻ đưa tin, để kịp lấy số thứ tự khám tại các bệnh viện tuyến đầu TPHCM, nhiều người dân phải đi khám từ nửa đêm, đến sớm và trải chiếu nằm chờ, với hy vọng lấy được số nhỏ, kịp chuyến xe về quê. Trong bối cảnh này, việc sử dụng các ứng dụng đặt khám giúp giải quyết tình trạng chờ đợi, đơn giản hóa quy trình đi khám cho người dân. Tìm hiểu tiện ích đặt khám nhanh - lấy số trước tại đây!",
            type: "document",
            description: [
                "Mỗi đêm, hàng trăm ngàn người bệnh đổ về các bệnh viện lớn, trải chiếu nằm chờ từ nửa đêm đến giờ xếp hàng, lấy số thứ tự. Họ mang theo nỗi lo lắng về sức khỏe và hy vọng vào kết quả khám bệnh, nhưng phải đối mặt với những giờ phút chờ đợi mệt mỏi. Nhiều người bệnh và thân nhân, đặc biệt là những người ở các tỉnh xa như Cà Mau, Ninh Thuận phải thức dậy từ rất sớm, thậm chí là đi khám từ nửa đêm. Trước thực trạng này, ứng dụng đặt khám là một giải pháp thông minh. Trong số đó, Medpro nổi bật với giải pháp toàn diện, giúp người dân không cần phải đến bệnh viện từ sáng sớm, mang lại sự an tâm với hơn 200 cơ sở y tế trên toàn quốc.",
            ],
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1723958664719_3d444fc91d.png&w=1920&q=100",
            timestamp: "18/08/2024, 12:33",
            author: "Mộc Thanh",
            from: "Tin dịch vụ",
            // end form data for parent element

            ///form data for content element (get by id);
            content: [
                {
                    title: "Khó khăn của người bệnh khi đi khám từ nửa đêm",
                    type: "document",
                    description: [
                        "Theo bản tin phóng sự từ Báo Tuổi Trẻ, việc đi khám từ nửa đêm là viễn cảnh quen thuộc ở các bệnh viện công tuyến đầu TPHCM. Hàng đêm, khi nhiều người còn say giấc ngủ thì người bệnh và thân nhân đã thức dậy, di chuyển đến TPHCM để xếp hàng, chờ bốc số thứ tự khám bệnh. Khung cảnh quen thuộc này diễn ra hàng ngày tại các bệnh viện lớn như Chợ Rẫy, Bình Dân, Ung Bướu, BV Đại học Y Dược TPHCM,... Những người bệnh từ các tỉnh xa như Cà Mau hay Trà Vinh, phải vượt hàng trăm cây số, ngồi xe đò suốt nhiều giờ liền để có mặt tại bệnh viện khi trời còn chưa sáng.",
                    ],
                    content: [
                        {
                            title: "Hàng dài xếp hàng chờ lấy số trước bình minh",
                            type: "document",
                            description: [
                                "Trước bình minh, người bệnh đã xếp hàng dài chờ khám tại các bệnh viện lớn ở TP.HCM, ngồi trên ghế lạnh hoặc trải chiếu nằm đợi. Gương mặt họ hiện rõ sự mệt mỏi, đặc biệt là những người từ tỉnh xa. Cái lạnh của đêm không làm họ nản lòng, chỉ mong được khám sớm để tránh phải chờ đợi cả ngày.",
                                'Khi chỉ còn 30 phút nữa đến 0h giờ bốc số tại BV Chợ Rẫy, hàng người đã ngồi kín hơn nửa sảnh. Bà Thanh Tùng (54 tuổi, Ninh Thuận) chia sẻ: "Đi sớm vậy mà vẫn chưa phải người đến sớm nhất". Bà cũng nói thêm, chỉ cần một tiếng nữa, hàng người sẽ kéo dài hết hành lang.',
                                "Phóng viên Báo Tuổi Trẻ ghi nhận, những người quen thuộc với việc khám bệnh đã có kinh nghiệm, nhưng những người lần đầu từ quê lên thì gặp nhiều khó khăn. Một số người bệnh đã đến BV Ung Bướu từ 23h nhưng phải đứng chờ ngoài cổng vì 2h30 mới mở. Tại BV Bình Dân, dù vừa hơn 0h, số thứ tự đã lên đến 18.",
                            ],
                            image: {
                                link: "https://cdn.medpro.vn/medpro-production/medpro/topics/nguoi-dan-xep-hang-luc-0gio-tai-bv-cho-ray.jpeg",
                                description: "Người dân xếp hàng chơ bốc số lúc 0h tại BV Chợ Rẫy. Nguồn: Báo Tuổi Trẻ",
                            },
                        },
                        {
                            title: "Thời gian và chi phí - Bài toán khó cho người bệnh",
                            type: "document",
                            description: [
                                'Thời gian chờ đợi không chỉ là thử thách về thể chất mà còn gây áp lực tinh thần, đặc biệt với những người từ xa đến TP.HCM khám bệnh. Để tiết kiệm chi phí, nhiều người không thuê phòng nghỉ, mang theo đồ ăn tự chuẩn bị và nằm đợi ở sảnh. Mỗi chuyến khám bệnh là một cuộc "đánh cược" với sức khỏe và tài chính gia đình.',
                                'Một người đàn ông từ xã Đông Hải, huyện Duyên Hải, chia sẻ rằng dù đã tính toán để đến đúng giờ BV Bình Dân phát số, anh vẫn chỉ lấy được số 19. Lần trước, anh chờ đến trưa mới được khám vì lấy số 28. Anh than thở: “Bệnh tật không mệt bằng việc đi đi về về mấy trăm cây số. Hy vọng lần này mổ xong luôn để khỏi phải tái khám".',
                                'Bà Xuân, bị suy thận hai năm, đã quen với cảnh đi khám từ nữa đêm. Khi con bà cầm phiếu số 106, bà không giấu nổi sự buồn bã, biết rằng có thể phải chờ đến hôm sau. Sau khi lấy số, hai mẹ con tìm chỗ ngủ trong khu vực đã kín người, cố gắng tiết kiệm tối đa bằng cách mang theo đồ ăn và không thuê trọ. Bà nói: “Còn phải đi khám dài dài, cố mà tiết kiệm, đói thì ăn cơm cháy rồi uống nước, về nhà mới ăn uống thoải mái được".',
                            ],
                            image: {
                                link: "https://cdn.medpro.vn/medpro-production/medpro/topics/nguoi-dan-trai-chieu-nam-tai-bv.jpeg",
                                description: "Người dân trải chiếu nằm chờ ở sảnh bệnh viện để tiết kiệm chi phí. Nguồn: Báo Tuổi Trẻ",
                            },
                        },
                    ],
                },
                {
                    title: "Ứng dụng đặt khám - Giải pháp y tế số, kết nối người dân với các bệnh viện hàng đầu",
                    type: "document",
                    description: [
                        "Trước những khó khăn và bất tiện trong quá trình khám chữa bệnh, đặt khám qua App (ứng dụng) đã xuất hiện như một giải pháp tối ưu, giúp người bệnh tiết kiệm thời gian và chi phí. Những ứng dụng này không chỉ cho phép đặt lịch khám mà còn giúp lấy số thứ tự trước, tránh tình trạng phải đi từ nửa đêm và chờ đợi lâu.",
                        "Trong xu hướng chuyển đổi số, Medpro nổi bật là một trong những ứng dụng hàng đầu trong lĩnh vực y tế số, cho phép đặt lịch khám tại hơn 200 cơ sở y tế trên toàn quốc. Ứng dụng này mang đến nhiều tiện ích như nhắc nhở lịch hẹn, hỗ trợ thanh toán trực tuyến, và tư vấn sức khỏe qua video với bác sĩ chuyên khoa. Người dùng chỉ cần đặt lịch và đến thẳng phòng khám, giúp rút ngắn quy trình và tiết kiệm thời gian đáng kể",
                        "Medpro không chỉ phổ biến trên Apple Store và Google Play mà còn được đông đảo người dùng tin tưởng. Hiện Medpro là đối tác chiến lược của nhiều bệnh viện lớn như Bệnh viện Đại học Y Dược TPHCM, Chợ Rẫy, Nhi đồng 1, Bệnh viện Mắt, Da liễu TPHCM,... Với phương châm vì sức khỏe cộng đồng, Medpro đang không ngừng nâng cao chất lượng dịch vụ y tế, giảm bớt gánh nặng cho người bệnh và trở thành người bạn đồng hành đáng tin cậy trong hành trình chăm sóc sức khỏe.",
                        "Đặt khám trên 200 cơ sở y tế trên toàn quốc: https://medpro.vn/co-so-y-te",
                    ],
                    image: "https://cdn.medpro.vn/medpro-production/medpro/topics/mang-luoi-ket-noi-200-csyt-medpro.jpeg",
                },
                {
                    title: "Kết luận",
                    type: "document",
                    description: [
                        "Trong bối cảnh những khó khăn và bất tiện khi đi khám bệnh giữa đêm khuya vẫn còn hiện hữu, việc sử dụng các ứng dụng đặt khám không chỉ mang lại sự tiện lợi mà còn giúp cải thiện đáng kể chất lượng cuộc sống cho người bệnh. Thay vì phải đi khám từ nửa đêm và chờ đợi mệt mỏi, người bệnh giờ đây có thể dễ dàng đặt khám nhanh - lấy số trước, tiết kiệm thời gian và chi phí. Với sự đồng hành của Medpro, người bệnh có thể yên tâm hơn trong hành trình chăm sóc sức khỏe, từ đó tập trung vào việc điều trị và phục hồi, không còn bị gánh nặng bởi những khó khăn trong việc khám chữa bệnh.",
                    ],
                    image: "https://cdn.medpro.vn/medpro-production/medpro/topics/mang-luoi-ket-noi-200-csyt-medpro.jpeg",
                    content: {
                        title: "Nguồn",
                        type: "number",
                        description: [
                            "Thông tin về việc người bệnh đi khám từ nửa đêm, xếp hàng dài tại các bệnh viện - Báo Tuổi Trẻ Online: https://tuoitre.vn/di-kham-benh-luc-nua-dem-20240808100358225.htm",
                        ],
                    },
                },
            ],
        },
        {
            //form data for parent element
            id: 6,
            title: "Đi khám bệnh từ nửa đêm, cuộc đua giữa thời gian và sức khỏe",
            shortDescription:
                "Báo Tuổi Trẻ đưa tin, để kịp lấy số thứ tự khám tại các bệnh viện tuyến đầu TPHCM, nhiều người dân phải đi khám từ nửa đêm, đến sớm và trải chiếu nằm chờ, với hy vọng lấy được số nhỏ, kịp chuyến xe về quê. Trong bối cảnh này, việc sử dụng các ứng dụng đặt khám giúp giải quyết tình trạng chờ đợi, đơn giản hóa quy trình đi khám cho người dân. Tìm hiểu tiện ích đặt khám nhanh - lấy số trước tại đây!",
            type: "document",
            description: [
                "Mỗi đêm, hàng trăm ngàn người bệnh đổ về các bệnh viện lớn, trải chiếu nằm chờ từ nửa đêm đến giờ xếp hàng, lấy số thứ tự. Họ mang theo nỗi lo lắng về sức khỏe và hy vọng vào kết quả khám bệnh, nhưng phải đối mặt với những giờ phút chờ đợi mệt mỏi. Nhiều người bệnh và thân nhân, đặc biệt là những người ở các tỉnh xa như Cà Mau, Ninh Thuận phải thức dậy từ rất sớm, thậm chí là đi khám từ nửa đêm. Trước thực trạng này, ứng dụng đặt khám là một giải pháp thông minh. Trong số đó, Medpro nổi bật với giải pháp toàn diện, giúp người dân không cần phải đến bệnh viện từ sáng sớm, mang lại sự an tâm với hơn 200 cơ sở y tế trên toàn quốc.",
            ],
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1723958664719_3d444fc91d.png&w=1920&q=100",
            timestamp: "18/08/2024, 12:33",
            author: "Mộc Thanh",
            from: "Tin dịch vụ",
            // end form data for parent element

            ///form data for content element (get by id);
            content: [
                {
                    title: "Khó khăn của người bệnh khi đi khám từ nửa đêm",
                    type: "document",
                    description: [
                        "Theo bản tin phóng sự từ Báo Tuổi Trẻ, việc đi khám từ nửa đêm là viễn cảnh quen thuộc ở các bệnh viện công tuyến đầu TPHCM. Hàng đêm, khi nhiều người còn say giấc ngủ thì người bệnh và thân nhân đã thức dậy, di chuyển đến TPHCM để xếp hàng, chờ bốc số thứ tự khám bệnh. Khung cảnh quen thuộc này diễn ra hàng ngày tại các bệnh viện lớn như Chợ Rẫy, Bình Dân, Ung Bướu, BV Đại học Y Dược TPHCM,... Những người bệnh từ các tỉnh xa như Cà Mau hay Trà Vinh, phải vượt hàng trăm cây số, ngồi xe đò suốt nhiều giờ liền để có mặt tại bệnh viện khi trời còn chưa sáng.",
                    ],
                    content: [
                        {
                            title: "Hàng dài xếp hàng chờ lấy số trước bình minh",
                            type: "document",
                            description: [
                                "Trước bình minh, người bệnh đã xếp hàng dài chờ khám tại các bệnh viện lớn ở TP.HCM, ngồi trên ghế lạnh hoặc trải chiếu nằm đợi. Gương mặt họ hiện rõ sự mệt mỏi, đặc biệt là những người từ tỉnh xa. Cái lạnh của đêm không làm họ nản lòng, chỉ mong được khám sớm để tránh phải chờ đợi cả ngày.",
                                'Khi chỉ còn 30 phút nữa đến 0h giờ bốc số tại BV Chợ Rẫy, hàng người đã ngồi kín hơn nửa sảnh. Bà Thanh Tùng (54 tuổi, Ninh Thuận) chia sẻ: "Đi sớm vậy mà vẫn chưa phải người đến sớm nhất". Bà cũng nói thêm, chỉ cần một tiếng nữa, hàng người sẽ kéo dài hết hành lang.',
                                "Phóng viên Báo Tuổi Trẻ ghi nhận, những người quen thuộc với việc khám bệnh đã có kinh nghiệm, nhưng những người lần đầu từ quê lên thì gặp nhiều khó khăn. Một số người bệnh đã đến BV Ung Bướu từ 23h nhưng phải đứng chờ ngoài cổng vì 2h30 mới mở. Tại BV Bình Dân, dù vừa hơn 0h, số thứ tự đã lên đến 18.",
                            ],
                            image: {
                                link: "https://cdn.medpro.vn/medpro-production/medpro/topics/nguoi-dan-xep-hang-luc-0gio-tai-bv-cho-ray.jpeg",
                                description: "Người dân xếp hàng chơ bốc số lúc 0h tại BV Chợ Rẫy. Nguồn: Báo Tuổi Trẻ",
                            },
                        },
                        {
                            title: "Thời gian và chi phí - Bài toán khó cho người bệnh",
                            type: "document",
                            description: [
                                'Thời gian chờ đợi không chỉ là thử thách về thể chất mà còn gây áp lực tinh thần, đặc biệt với những người từ xa đến TP.HCM khám bệnh. Để tiết kiệm chi phí, nhiều người không thuê phòng nghỉ, mang theo đồ ăn tự chuẩn bị và nằm đợi ở sảnh. Mỗi chuyến khám bệnh là một cuộc "đánh cược" với sức khỏe và tài chính gia đình.',
                                'Một người đàn ông từ xã Đông Hải, huyện Duyên Hải, chia sẻ rằng dù đã tính toán để đến đúng giờ BV Bình Dân phát số, anh vẫn chỉ lấy được số 19. Lần trước, anh chờ đến trưa mới được khám vì lấy số 28. Anh than thở: “Bệnh tật không mệt bằng việc đi đi về về mấy trăm cây số. Hy vọng lần này mổ xong luôn để khỏi phải tái khám".',
                                'Bà Xuân, bị suy thận hai năm, đã quen với cảnh đi khám từ nữa đêm. Khi con bà cầm phiếu số 106, bà không giấu nổi sự buồn bã, biết rằng có thể phải chờ đến hôm sau. Sau khi lấy số, hai mẹ con tìm chỗ ngủ trong khu vực đã kín người, cố gắng tiết kiệm tối đa bằng cách mang theo đồ ăn và không thuê trọ. Bà nói: “Còn phải đi khám dài dài, cố mà tiết kiệm, đói thì ăn cơm cháy rồi uống nước, về nhà mới ăn uống thoải mái được".',
                            ],
                            image: {
                                link: "https://cdn.medpro.vn/medpro-production/medpro/topics/nguoi-dan-trai-chieu-nam-tai-bv.jpeg",
                                description: "Người dân trải chiếu nằm chờ ở sảnh bệnh viện để tiết kiệm chi phí. Nguồn: Báo Tuổi Trẻ",
                            },
                        },
                    ],
                },
                {
                    title: "Ứng dụng đặt khám - Giải pháp y tế số, kết nối người dân với các bệnh viện hàng đầu",
                    type: "document",
                    description: [
                        "Trước những khó khăn và bất tiện trong quá trình khám chữa bệnh, đặt khám qua App (ứng dụng) đã xuất hiện như một giải pháp tối ưu, giúp người bệnh tiết kiệm thời gian và chi phí. Những ứng dụng này không chỉ cho phép đặt lịch khám mà còn giúp lấy số thứ tự trước, tránh tình trạng phải đi từ nửa đêm và chờ đợi lâu.",
                        "Trong xu hướng chuyển đổi số, Medpro nổi bật là một trong những ứng dụng hàng đầu trong lĩnh vực y tế số, cho phép đặt lịch khám tại hơn 200 cơ sở y tế trên toàn quốc. Ứng dụng này mang đến nhiều tiện ích như nhắc nhở lịch hẹn, hỗ trợ thanh toán trực tuyến, và tư vấn sức khỏe qua video với bác sĩ chuyên khoa. Người dùng chỉ cần đặt lịch và đến thẳng phòng khám, giúp rút ngắn quy trình và tiết kiệm thời gian đáng kể",
                        "Medpro không chỉ phổ biến trên Apple Store và Google Play mà còn được đông đảo người dùng tin tưởng. Hiện Medpro là đối tác chiến lược của nhiều bệnh viện lớn như Bệnh viện Đại học Y Dược TPHCM, Chợ Rẫy, Nhi đồng 1, Bệnh viện Mắt, Da liễu TPHCM,... Với phương châm vì sức khỏe cộng đồng, Medpro đang không ngừng nâng cao chất lượng dịch vụ y tế, giảm bớt gánh nặng cho người bệnh và trở thành người bạn đồng hành đáng tin cậy trong hành trình chăm sóc sức khỏe.",
                        "Đặt khám trên 200 cơ sở y tế trên toàn quốc: https://medpro.vn/co-so-y-te",
                    ],
                    image: "https://cdn.medpro.vn/medpro-production/medpro/topics/mang-luoi-ket-noi-200-csyt-medpro.jpeg",
                },
                {
                    title: "Kết luận",
                    type: "document",
                    description: [
                        "Trong bối cảnh những khó khăn và bất tiện khi đi khám bệnh giữa đêm khuya vẫn còn hiện hữu, việc sử dụng các ứng dụng đặt khám không chỉ mang lại sự tiện lợi mà còn giúp cải thiện đáng kể chất lượng cuộc sống cho người bệnh. Thay vì phải đi khám từ nửa đêm và chờ đợi mệt mỏi, người bệnh giờ đây có thể dễ dàng đặt khám nhanh - lấy số trước, tiết kiệm thời gian và chi phí. Với sự đồng hành của Medpro, người bệnh có thể yên tâm hơn trong hành trình chăm sóc sức khỏe, từ đó tập trung vào việc điều trị và phục hồi, không còn bị gánh nặng bởi những khó khăn trong việc khám chữa bệnh.",
                    ],
                    image: "https://cdn.medpro.vn/medpro-production/medpro/topics/mang-luoi-ket-noi-200-csyt-medpro.jpeg",
                    content: {
                        title: "Nguồn",
                        type: "number",
                        description: [
                            "Thông tin về việc người bệnh đi khám từ nửa đêm, xếp hàng dài tại các bệnh viện - Báo Tuổi Trẻ Online: https://tuoitre.vn/di-kham-benh-luc-nua-dem-20240808100358225.htm",
                        ],
                    },
                },
            ],
        },
    ];

    const listNewsService = listNews.filter((news) => news.from === "Tin dịch vụ");
    const top3News = listNews.slice(0, 3);
    const firstNews = top3News.shift();

    const url = {
        "Tin dịch vụ": "tin-tuc",
        "Tin Y tế": "tin-tuc/tin-y-te",
        "Y học thường thức": "tin-tuc/y-hoc-thuong-thuc",
    };

    return (
        <div className="flex-col flex">
            <div className="flex gap-4 mb-8">
                <ListTopNewsCard top3News={top3News} url={url} firstNews={firstNews} />
                <div className="w-2/5">
                    <div className="flex flex-col gap-4">
                        {listNews.splice(3).map((news, index) => (
                            <>
                                <TopNewsCard key={index} index={index} news={news} url={url} />
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between gap-8 mb-8">
                    <Heading1 className="text-primary w-fit whitespace-nowrap">Tin dịch vụ</Heading1>
                    <hr className="h-1 w-full bg-primary mt-3" />
                </div>
                <div className="relative">
                    <ListOtherNewsCard listNewsService={listNewsService} url={url} />
                    <Button
                        className="px-12 bg-gradient-to-r from-primary-3 to-primary-2 rounded-full border-none mx-auto my-8 hover:from-primary-2 hover:to-primary transition-all flex items-center gap-1 "
                        size="2sm">
                        <span className="text-white font-medium">Xem tất cả</span>
                        <MdOutlineKeyboardDoubleArrowRight className="size-6 fill-white mt-1" />
                    </Button>
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between gap-8 mb-8">
                    <Heading1 className="text-primary w-fit whitespace-nowrap">Tin y tế</Heading1>
                    <hr className="h-1 w-full bg-primary mt-3" />
                </div>
                <div className="relative">
                    <div className="flex gap-4">
                        {top3News.map((news, index) => (
                            <>
                                <OtherNewsCard key={index} index={index} news={news} url={url} />
                                <OtherNewsCard key={index} index={index} news={news} url={url} />
                            </>
                        ))}
                    </div>
                    <Button
                        className="px-12 bg-gradient-to-r from-primary-3 to-primary-2 rounded-full border-none mx-auto my-8 hover:from-primary-2 hover:to-primary transition-all flex items-center gap-1 "
                        size="2sm">
                        <span className="text-white font-medium">Xem tất cả</span>
                        <MdOutlineKeyboardDoubleArrowRight className="size-6 fill-white mt-1" />
                    </Button>
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between gap-8 mb-8">
                    <Heading1 className="text-primary w-fit whitespace-nowrap">Y học thường thức</Heading1>
                    <hr className="h-1 w-full bg-primary mt-3" />
                </div>
                <div className="relative flex justify-between gap-4">
                    <div className="">
                        <SecondNewsCard key={firstNews.title} news={firstNews} url={firstNews} index={firstNews.id} />
                    </div>
                    <div className="flex flex-col  w-2/5">
                        {top3News.map((news, index) => (
                            <>
                                <div className=" bottom-0 p-2 border-b-2 border-gray-400 group md:cursor-pointer">
                                    <div className="flex gap-1 items-center">
                                        <GoDotFill className="fill-yellow-500" />
                                        <span className="text-gray-700 font-semibold text-sm">{news.from}</span>
                                    </div>
                                    <Heading6 className="text-gray-700 line-clamp-2 group-hover:text-primary transition-all">{news.title}</Heading6>
                                    <Paragraph className="text-gray-700 line-clamp-2 text-sm">{news.shortDescription}</Paragraph>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <Button
                    className="px-12 bg-gradient-to-r from-primary-3 to-primary-2 rounded-full border-none mx-auto my-8 hover:from-primary-2 hover:to-primary transition-all flex items-center gap-1 "
                    size="2sm">
                    <span className="text-white font-medium">Xem tất cả</span>
                    <MdOutlineKeyboardDoubleArrowRight className="size-6 fill-white mt-1" />
                </Button>
            </div>
        </div>
    );
};

export { MainNewsPage };
