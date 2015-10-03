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
                                    {"articlePreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =145 ,Width = 170 }, CacheFolder = "articlePreview", ScaleMode = ScaleMode.Crop}},
                                    {"eventAnnouncementPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =100 ,Width = 100 }, CacheFolder = "eventAnnouncementPreview", ScaleMode = ScaleMode.Crop}},
                                    {"eventImagePreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =50 ,Width = 50 }, CacheFolder = "eventImagePreview", ScaleMode = ScaleMode.Crop}},
                                    
                                    
                                    
                                    {"author",new ThumbnailPicture{ PictureSize =new PictureSize {Height =670 ,Width = 670 }, CacheFolder = "author", ScaleMode = ScaleMode.Crop}},
                                    {"authorThumb",new ThumbnailPicture{ PictureSize =new PictureSize {Height =324 ,Width = 324 }, CacheFolder = "authorThumb", ScaleMode = ScaleMode.Crop}},
                                    {"authorAvatar",new ThumbnailPicture{ PictureSize =new PictureSize {Height =150 ,Width = 150 }, CacheFolder = "authorAvatar", ScaleMode = ScaleMode.Crop}},
                                    {"productThumb",new ThumbnailPicture{ PictureSize =new PictureSize {Height =324 ,Width = 324 }, CacheFolder = "productThumb", ScaleMode = ScaleMode.Crop}},
                                    //{"siteProductPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =215 ,Width = 268 }, CacheFolder = "siteProductPreview", ScaleMode = ScaleMode.Insert}},
                                    //{"siteProductDetailsMainImage",new ThumbnailPicture{ PictureSize =new PictureSize {Height =344 ,Width = 597 }, CacheFolder = "siteProductDetailsMainImage", ScaleMode = ScaleMode.Insert}},
                                    //{"siteProductDetailsThumbnail",new ThumbnailPicture{ PictureSize =new PictureSize {Height =90 ,Width = 90 }, CacheFolder = "siteProductDetailsThumbnail", ScaleMode = ScaleMode.Insert}},
                                    
                                    //{"articlePreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =130 ,Width = 276 }, CacheFolder = "articlePreview", ScaleMode = ScaleMode.Crop}},
                                    //{"articleSmallPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =133 ,Width = 133 }, CacheFolder = "articleSmallPreview", ScaleMode = ScaleMode.Crop}},
                                    //{"articleAdminPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =50 ,Width = 100 }, CacheFolder = "articleAdminPreview", ScaleMode = ScaleMode.Crop}},
                                    //{"articleItemImageAdminPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height =50 ,Width = 50 }, CacheFolder = "articleItemImageAdminPreview", ScaleMode = ScaleMode.Crop}},
                                    //{"articleCaruselItem",new ThumbnailPicture{ PictureSize =new PictureSize {Height =391 ,Width = 522 }, CacheFolder = "articleCaruselItem", ScaleMode = ScaleMode.Crop}},
                                    //{"cartProductImage",new ThumbnailPicture{ PictureSize =new PictureSize {Height =154 ,Width = 154 }, CacheFolder = "cartProductImage", ScaleMode = ScaleMode.Crop}},
                                    //{"pageBanner",new ThumbnailPicture{ PictureSize =new PictureSize {Height =233 ,Width = 1195 }, CacheFolder = "pageBanner", ScaleMode = ScaleMode.Crop}},
                                    //{"adminPageBanner",new ThumbnailPicture{ PictureSize =new PictureSize {Height =30 ,Width = 150 }, CacheFolder = "adminPageBanner", ScaleMode = ScaleMode.Crop}},
                                    //{"mainPageBanner",new ThumbnailPicture{ PictureSize =new PictureSize {Height =478 ,Width = 1195 }, CacheFolder = "mainPageBanner", ScaleMode = ScaleMode.Crop}},
                                    //{"siteBanner",new ThumbnailPicture{ PictureSize =new PictureSize {Height =132 ,Width = 558 }, CacheFolder = "siteBanner", ScaleMode = ScaleMode.Crop}},
                                    //{"adminMainPageBanner",new ThumbnailPicture{ PictureSize =new PictureSize {Height =120 ,Width = 300 }, CacheFolder = "adminMainPageBanner", ScaleMode = ScaleMode.Crop}},

                                  //{"adminPreviewProductImage",new ThumbnailPicture{ PictureSize =new PictureSize {Height = 200,Width = 200}, CacheFolder = "adminPreviewProductImage", ScaleMode = ScaleMode.Crop}},

                                  //{"brandImagePreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height = 150,Width = 215}, CacheFolder = "brandImagePreview", ScaleMode = ScaleMode.Crop}},
                                  //{"factoryCatalogueCategoryPreview",new ThumbnailPicture{ PictureSize =new PictureSize {Height = 212,Width = 213}, CacheFolder = "factoryCatalogueCategoryPreview", ScaleMode = ScaleMode.Crop}},
                                  //{"articleImage",new ThumbnailPicture{ PictureSize = new PictureSize {Width = 740}, CacheFolder = "articleImage", ScaleMode = ScaleMode.FixedWidth}},
                                  //{"designerAdminPreview",new ThumbnailPicture{ PictureSize = new PictureSize {Width = 100,Height = 100}, CacheFolder = "designerAdminPreview", ScaleMode = ScaleMode.Crop}},
                                  //{"portfolioPreview",new ThumbnailPicture{ PictureSize = new PictureSize {Width = 213,Height = 213}, CacheFolder = "portfolioPreview", ScaleMode = ScaleMode.Crop}}
                              };

        }

        public static ThumbnailPicture GetThumbnail(string cacheFolder)
        {
            if (Thumbnails.ContainsKey(cacheFolder))
                return Thumbnails[cacheFolder];
            throw new Exception("Can't find thumbnail " + cacheFolder);
        }

        public static string Version
        {
            get { return "0.1.53"; }
        }

        public static string MailTo
        {
            get { return "mailto:miller.kak.miller@gmail.com"; }
        }

        //public static int AdminProductsPageSize = 20;
        //public static int ProductsPageSize = 15;
    }
}