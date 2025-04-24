import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";

const Container = () => {
    const { slug } = useParams();
    const content = {};
    if (slug === "visi-misi") {
        content.data = {
            content: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2E86C1; text-align: center; border-bottom: 2px solid #2E86C1; padding-bottom: 10px;">Visi</h2>
                    <p style="text-indent: 20px; font-size: 16px;">
                        Menjadi daerah yang <strong>unggul</strong> dalam segala aspek kehidupan, 
                        berlandaskan nilai-nilai <em>keadilan, keberlanjutan, dan inovasi</em>, serta 
                        mampu memberikan kontribusi signifikan bagi kesejahteraan masyarakat dan 
                        pembangunan nasional.
                    </p>
                    <h2 style="color: #2E86C1; text-align: center; border-bottom: 2px solid #2E86C1; padding-bottom: 10px;">Misi</h2>
                    <ol style="padding-left: 40px; font-size: 16px;">
                        <li>Meningkatkan mutu pendidikan dan kesehatan masyarakat secara menyeluruh.</li>
                        <li>Mendorong pertumbuhan ekonomi berbasis teknologi dan inovasi.</li>
                        <li>Melestarikan budaya lokal dan meningkatkan pariwisata berwawasan lingkungan.</li>
                        <li>Memastikan pengelolaan sumber daya alam yang berkelanjutan dan bertanggung jawab.</li>
                        <li>Memperkuat tata kelola pemerintahan yang transparan, efektif, dan akuntabel.</li>
                        <li>Memperkokoh solidaritas sosial untuk menciptakan masyarakat yang damai dan harmonis.</li>
                    </ol>
                </div>
            `,
        };
    } else if (slug === "program-kerja-daerah"){
        content.data = {
            content: `
                            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                                <h2 style="color: #28B463; text-align: center; border-bottom: 2px solid #28B463; padding-bottom: 10px;">Program Kerja Daerah</h2>
                                <p style="text-indent: 20px; font-size: 16px;">
                                Program kerja daerah dirancang untuk mendukung visi dan misi dengan fokus pada pembangunan yang berkelanjutan, inklusif, dan berorientasi pada kesejahteraan masyarakat. Berikut adalah beberapa program unggulan yang akan dilaksanakan:
                                </p>
                                <ul style="padding-left: 40px; font-size: 16px;">
                                <li style="margin-bottom: 10px;"><strong>Pengembangan Infrastruktur:</strong>
                                    <p style="margin: 5px 0 0 20px;">Membangun dan memperbaiki infrastruktur jalan, jembatan, serta fasilitas publik untuk mendukung mobilitas dan aktivitas ekonomi masyarakat.</p>
                                </li>
                                <li style="margin-bottom: 10px;"><strong>Peningkatan Kualitas Pendidikan:</strong>
                                    <p style="margin: 5px 0 0 20px;">Meningkatkan akses pendidikan melalui pembangunan sekolah, pemberdayaan guru, dan program beasiswa bagi siswa berprestasi.</p>
                                </li>
                                <li style="margin-bottom: 10px;"><strong>Pemberdayaan Ekonomi Kreatif:</strong>
                                    <p style="margin: 5px 0 0 20px;">Mendorong pertumbuhan ekonomi berbasis kreatif dengan pelatihan kewirausahaan dan dukungan finansial bagi pelaku UMKM.</p>
                                </li>
                                <li style="margin-bottom: 10px;"><strong>Pelestarian Lingkungan Hidup:</strong>
                                    <p style="margin: 5px 0 0 20px;">Melaksanakan program penghijauan, pengelolaan sampah, serta edukasi masyarakat tentang pentingnya kelestarian lingkungan.</p>
                                </li>
                                <li style="margin-bottom: 10px;"><strong>Peningkatan Layanan Kesehatan:</strong>
                                    <p style="margin: 5px 0 0 20px;">Menyediakan fasilitas kesehatan yang memadai serta program kesehatan preventif untuk meningkatkan kualitas hidup masyarakat.</p>
                                </li>
                                <li style="margin-bottom: 10px;"><strong>Peningkatan Pariwisata Lokal:</strong>
                                    <p style="margin: 5px 0 0 20px;">Mengembangkan destinasi wisata lokal dengan pendekatan berkelanjutan untuk menarik wisatawan dan meningkatkan pendapatan daerah.</p>
                                </li>
                                </ul>
                            </div>
                            `
        }
    } else if (slug === "sejarah"){
        content.data = {
            content: `
                        <div>
                            <h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 10px;">
                            Kerajaan Sriwijaya
                            </h2>
                            <p style="color: #34495e; font-size: 16px; line-height: 1.5;">
                            Kerajaan maritim yang pernah berjaya di Asia Tenggara pada abad ke-7 hingga ke-13. 
                            Sriwijaya dikenal sebagai pusat perdagangan dan penyebaran agama Buddha.
                            </p>
                            <img 
                            src="http://3.bp.blogspot.com/-wnrkShr8Cdo/VPBWGf24RLI/AAAAAAAABa8/cj0NNr6euE8/s1600/sriwijaya%2B4.jpg" 
                            alt="Kerajaan Sriwijaya" 
                            style="width: 100%; max-width: 600px; border-radius: 8px; margin-top: 10px;"
                            />
                        </div>
                        <div style="margin-top: 20px;">
                            <h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 10px;">
                            Pendudukan Belanda
                            </h2>
                            <p style="color: #34495e; font-size: 16px; line-height: 1.5;">
                            Periode penjajahan Belanda di wilayah Sumatra Selatan berlangsung dari tahun 1602 hingga 1942, 
                            memberikan dampak besar pada sejarah dan budaya lokal.
                            </p>
                        </div>
                        `
        }
    } else if (slug === "struktur"){
        content.data = {
            content:`
                        <div style="font-family: Arial, sans-serif; color: #2c3e50;">
                            <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">
                            Susunan Pemerintahan Kabupaten
                            </h2>
                            <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 15px;">
                                <strong>Bupati:</strong> Muhammad Ali
                            </li>
                            <li style="margin-bottom: 15px;">
                                <strong>Sekretaris Daerah:</strong> Rahmat Hidayat
                            </li>
                            <li>
                                <strong>Kepala Dinas Pendidikan:</strong> Anita Putri
                                <br />
                                <span style="color: #7f8c8d;">Departemen: Pendidikan</span>
                            </li>
                            </ul>
                        </div>
                        `
        }
    }
    
    // const {
    //     data: content,
    //     isLoading: isLoadingContent,
    //     isError: isErrorContent,
    //     isFetching: isFetchingContent,
    //     refetch: refetchContent,
    //   } = useQuery({
    //     queryKey: ["Content", slug],
    //     enabled: !!slug,
    //     queryFn: async () => {
    //       return await ContentService.getOne(slug, {with:"user,category"});
    //     },
    //   });

  return (
    <>  
        <div className="min-h-screen w-full">
            {/* {isLoadingContent ? (
                <ArticleDetailSkeleton/>
            ) : isErrorContent && !isFetchingContent && !content || Object.keys(content.data || {}).length === 0 ? (
                <div className="flex w-full h-full justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400">Data tidak tersedia</p>
                    </div>
                </div>
            ) : isErrorContent && !isFetchingContent  ? (
                <div className="w-full h-full flex justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400">Terjadi kesalahan, silakan ulangi</p>
                        <Button
                            size="sm"
                            onClick={() => {
                                refetchContent();
                            }}
                        >
                            <LuRefreshCcw size={24} />
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="px-4 md:px-12 mt-20" dangerouslySetInnerHTML={{ __html: content.data.content }} />
                </>
            )} */}

            <div className="px-4 md:px-12 mt-10" dangerouslySetInnerHTML={{ __html: content.data.content }} />
      </div>
    </>
  );
};

export default Container;
