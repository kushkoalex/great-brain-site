using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GreatBrain.UI.Helpers;

namespace GreatBrain.UI
{
    public static class SiteSettings
    {
        public static Dictionary<string, ThumbnailPicture> Thumbnails { get; private set; }


        static SiteSettings()
        {
            Thumbnails = new Dictionary<string, ThumbnailPicture>
                              {
                                    {"mainBannerPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =200 ,Width = 400 }, CacheFolder = "mainBannerPreview", ScaleMode = ScaleMode.Crop}},
                                    {"contentAnnouncementPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =200 ,Width = 200 }, CacheFolder = "contentAnnouncementPreview", ScaleMode = ScaleMode.Crop}},
                                    {"educationalInstitutionPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =200 ,Width = 200 }, CacheFolder = "educationalInstitutionPreview", ScaleMode = ScaleMode.Crop}},
                                    {"educationalInstitutionImagesAdminPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =100 ,Width = 100 }, CacheFolder = "educationalInstitutionImagesAdminPreview", ScaleMode = ScaleMode.Crop}},
                                    {"articlePreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =200 ,Width = 200 }, CacheFolder = "articlePreview", ScaleMode = ScaleMode.Crop}},
                                    {"bannerPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =170 ,Width = 380 }, CacheFolder = "bannerPreview", ScaleMode = ScaleMode.Crop}},
                                    {"blogPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =200 ,Width = 200 }, CacheFolder = "blogPreview", ScaleMode = ScaleMode.Crop}},
                                    {"articleImagesPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =100 ,Width = 100 }, CacheFolder = "articleImagesPreview", ScaleMode = ScaleMode.Crop}},
                                    {"parallax",new ThumbnailPicture{ PictureSize =new PictureSize {Height =200 ,Width = 400 }, CacheFolder = "parallax", ScaleMode = ScaleMode.Crop}},
                              };

        }

        public static ThumbnailPicture GetThumbnail(string cacheFolder)
        {
            if (Thumbnails.ContainsKey(cacheFolder))
                return Thumbnails[cacheFolder];
            throw new Exception("Can't find thumbnail " + cacheFolder);
        }

        public static int MainBannnerImageMaxDimention { get { return 2000; } }
        public static string MainBannnerImagePath { get { return "~/Content/Images/mainBanner"; } }
        public static string ContentAnouncementImagePath { get { return "~/Content/Images/contentAnouncement"; } }
        public static string EducationalInstitutionLogoImagePath { get { return "~/Content/Images/educationalInstitutionLogo"; } }
        public static string EducationalInstitutionPreviewImagePath { get { return "~/Content/Images/educationalInstitutionPreview"; } }
        public static string EducationalInstitutionImagesPath { get { return "~/Content/Images/educationalInstitutionImages"; } }
        public static string ArticlePreviewPath { get { return "~/Content/Images/articlePreview"; } }
        public static string BannersPath { get { return "~/Content/Images/banners"; } }
        
        public static string ArticleImagesPath { get { return "~/Content/Images/articleImages"; } }
        public static string BlogPreviewPath { get { return "~/Content/Images/blogPreview"; } }
        public static string Parallax { get { return "~/Content/Images/parallax"; } }

        public static string MailTo
        {
            get { return "mailto:miller.kak.miller@gmail.com"; }
        }

        //public static int AdminProductsPageSize = 20;
        //public static int ProductsPageSize = 15;
    }
}