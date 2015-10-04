using System;
using System.Drawing;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace GreatBrain.UI.Helpers
{
    //public class ThunmnailPictures : Dictionary<string, PictureDimensions>
    //{

    //}

    //public enum Orientation
    //{
    //    Horizontal,
    //    Vertical
    //}

    /// <summary>
    /// Метод масштабирования
    /// </summary>
    public enum ScaleMode
    {
        /// <summary>
        /// Фиксированная ширина, произвольная высота
        /// </summary>
        FixedWidth,

        /// <summary>
        /// Фиксированная высота, произвольная ширина
        /// </summary>
        FixedHeight,

        /// <summary>
        /// Обрезка лишнего
        /// </summary>
        Crop,

        /// <summary>
        /// Вписать изображение в превью полностью с бекграундом
        /// </summary>
        Insert,

        /// <summary>
        /// Уменьшить изображение без бекграунда
        /// </summary>
        InsertWithoutBackground,

        /// <summary>
        /// Автоматический, либо обрезка лишнего либо вписывание изображения в превью полностью
        /// </summary>
        Auto
    }

    //public enum FixedDimension
    //{

    //}

    /// <summary>
    /// Графический хелпер
    /// </summary>
    public static class GraphicsHelper
    {

        private static int _width;
        private static int _height;

        private static bool IsHorizontalImage(Size imageSise)
        {
            return imageSise.Width > imageSise.Height;
        }




        private static Rectangle CalculateDestRect(Size sourceImageSize, Size thumbImageSize, ScaleMode scaleMode, int delta)
        {
            double hvr = (double)sourceImageSize.Width / (double)sourceImageSize.Height;
            double hRatio;
            double wRatio;
            double ratio;
            int resultSourceImageWidth;
            int resultSourceImageHeight;
            switch (scaleMode)
            {
                case ScaleMode.Insert:
                    thumbImageSize.Width -= delta * 2;
                    thumbImageSize.Height -= delta * 2;

                    hRatio = (double)thumbImageSize.Height / sourceImageSize.Height;
                    wRatio = (double)thumbImageSize.Width / sourceImageSize.Width;
                    ratio = hRatio < wRatio ? hRatio : wRatio;
                    resultSourceImageWidth = (int)(sourceImageSize.Width * ratio);
                    resultSourceImageHeight = (int)(sourceImageSize.Height * ratio);
                    if (thumbImageSize.Width > resultSourceImageWidth)
                    {
                        int offset = ((thumbImageSize.Width + delta * 2) - resultSourceImageWidth) / 2;
                        return new Rectangle(offset, 0 + delta, resultSourceImageWidth, resultSourceImageHeight);
                    }
                    if (thumbImageSize.Height > resultSourceImageHeight)
                    {
                        var offset = ((thumbImageSize.Height + delta * 2) - resultSourceImageHeight) / 2;
                        return new Rectangle(0 + delta, offset, resultSourceImageWidth, resultSourceImageHeight);
                    }
                    break;

                case ScaleMode.InsertWithoutBackground:
                    hRatio = (double)thumbImageSize.Height / sourceImageSize.Height;
                    wRatio = (double)thumbImageSize.Width / sourceImageSize.Width;
                    ratio = hRatio < wRatio ? hRatio : wRatio;
                    resultSourceImageWidth = (int)(sourceImageSize.Width * ratio);
                    resultSourceImageHeight = (int)(sourceImageSize.Height * ratio);
                    return new Rectangle(0, 0, resultSourceImageWidth, resultSourceImageHeight);

                case ScaleMode.FixedWidth:
                    int destImageHeight = (int)(thumbImageSize.Width / hvr);
                    return new Rectangle(0, 0, thumbImageSize.Width, destImageHeight);

                case ScaleMode.FixedHeight:
                    int destImageWidth = (int)(thumbImageSize.Height * hvr);
                    return new Rectangle(0, 0, destImageWidth, thumbImageSize.Height);

            }
            return new Rectangle(0, 0, thumbImageSize.Width, thumbImageSize.Height);
        }

        private static Rectangle CalculateSourceRect(Size sourceImageSize, Size thumbImageSize, ScaleMode scaleMode)
        {
            int previewHeight = thumbImageSize.Height;
            int previewWidth = thumbImageSize.Width;

            switch (scaleMode)
            {
                case ScaleMode.Crop:
                    double wRatio = (double)sourceImageSize.Width / previewWidth;
                    double hRatio = (double)sourceImageSize.Height / previewHeight;
                    double coef = (double)previewHeight / previewWidth;
                    int resultWidth;
                    int resultHeight;
                    if (wRatio < hRatio)
                    {
                        resultWidth = sourceImageSize.Width;
                        resultHeight = (int)Math.Truncate(sourceImageSize.Width * coef);
                        return new Rectangle(0, (sourceImageSize.Height - resultHeight) / 2, resultWidth, resultHeight);
                    }
                    else
                    {
                        resultHeight = sourceImageSize.Height;
                        resultWidth = (int)Math.Truncate(sourceImageSize.Height / coef);
                        return new Rectangle((sourceImageSize.Width - resultWidth) / 2, 0, resultWidth, resultHeight);
                    }

                case ScaleMode.Insert:
                    return new Rectangle(0, 0, sourceImageSize.Width, sourceImageSize.Height);

                default:
                    return new Rectangle(0, 0, sourceImageSize.Width, sourceImageSize.Height);
            }
        }


        private static void SaveCropPreview(Bitmap image, Stream saveTo, int x, int y, int previewWidth, int previewHeight)
        {
            Rectangle sourceRect = new Rectangle(x, y, previewWidth, previewHeight);
            Rectangle destRect = new Rectangle(0, 0, previewWidth, previewHeight);
            Bitmap thumbnailImage = new Bitmap(previewWidth, previewHeight);
            System.Drawing.Graphics graphics = System.Drawing.Graphics.FromImage(thumbnailImage);
            graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            graphics.DrawImage(image, destRect, sourceRect, GraphicsUnit.Pixel);
            thumbnailImage.Save(saveTo, System.Drawing.Imaging.ImageFormat.Jpeg);
            saveTo.Position = 0;


            //graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            //graphics.SmoothingMode = SmoothingMode.HighQuality;
            //graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
            //graphics.CompositingQuality = CompositingQuality.HighQuality;
            //graphics.DrawImage(image, destRect, sourceRect, GraphicsUnit.Pixel);
        }


        private static void ScaleAndSaveOriginalImage(Bitmap sourcelImage, Stream saveTo, int destinationWidth, int destinationHeight, ScaleMode scaleMode)
        {
            Size thumbImageSize = new Size(destinationWidth, destinationHeight);
            int delta = 0;

            Rectangle sourceRect = CalculateSourceRect(sourcelImage.Size, thumbImageSize, scaleMode);

            Rectangle destRect = CalculateDestRect(sourcelImage.Size, thumbImageSize, scaleMode, delta);

            Bitmap thumbnailImage;


            if (scaleMode == ScaleMode.Insert)
                thumbnailImage = new Bitmap(thumbImageSize.Width, thumbImageSize.Height);
            else
                thumbnailImage = new Bitmap(destRect.Width, destRect.Height);

            System.Drawing.Graphics graphics = System.Drawing.Graphics.FromImage(thumbnailImage);
            if (scaleMode == ScaleMode.Insert)
                graphics.FillRectangle(new SolidBrush(Color.White), 0, 0, thumbImageSize.Width, thumbImageSize.Height);
            else
                graphics.FillRectangle(new SolidBrush(Color.White), 0, 0, destRect.Width, destRect.Height);
            graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            graphics.DrawImage(sourcelImage, destRect, sourceRect, GraphicsUnit.Pixel);

            thumbnailImage.Save(saveTo, System.Drawing.Imaging.ImageFormat.Jpeg);
            saveTo.Position = 0;

        }

        private static void ScaleAndSaveOriginalImage(int limitLength, Bitmap image, Stream saveTo)
        {

            Rectangle sourceRect = new Rectangle(0, 0, image.Width, image.Height);
            Rectangle destRect;
            int resultSourceImageWidth = image.Width;
            int resultSourceImageHeight = image.Height;
            if (image.Width <= limitLength && image.Height <= limitLength)
            {
                destRect = new Rectangle(0, 0, image.Width, image.Height);
            }
            else
            {
                double wRatio = (double)limitLength / image.Width;
                double hRatio = (double)limitLength / image.Height;
                double ratio = hRatio < wRatio ? hRatio : wRatio;
                resultSourceImageWidth = (int)(image.Width * ratio);
                resultSourceImageHeight = (int)(image.Height * ratio);
                destRect = new Rectangle(0, 0, resultSourceImageWidth, resultSourceImageHeight);
            }

            Bitmap thumbnailImage = new Bitmap(resultSourceImageWidth, resultSourceImageHeight);

            System.Drawing.Graphics graphics = System.Drawing.Graphics.FromImage(thumbnailImage);
            graphics.FillRectangle(new SolidBrush(Color.White), 0, 0, resultSourceImageWidth, resultSourceImageHeight);
            graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            graphics.DrawImage(image, destRect, sourceRect, GraphicsUnit.Pixel);

            thumbnailImage.Save(saveTo, System.Drawing.Imaging.ImageFormat.Jpeg);
            saveTo.Position = 0;
        }

        public static bool ScaleImage(string name, Bitmap image, Size thumbImage, Stream saveTo, ScaleMode scaleMode, bool useBgImage, int delta)
        {
            if (scaleMode == ScaleMode.Auto)
            {
                scaleMode = IsHorizontalImage(image.Size) ? ScaleMode.Crop : ScaleMode.Insert;
            }

            Rectangle sourceRect = CalculateSourceRect(image.Size, thumbImage, scaleMode);

            Rectangle destRect = CalculateDestRect(image.Size, thumbImage, scaleMode, delta);

            Bitmap thumbnailImage;

            if (useBgImage)
            {
                string backgroundImageSourcePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Content/Images/bg"), "bg.jpg");
                using (FileStream stream = new FileStream(backgroundImageSourcePath, FileMode.Open))
                {
                    thumbnailImage = new Bitmap(stream);
                    System.Drawing.Graphics graphics = System.Drawing.Graphics.FromImage(thumbnailImage);

                    graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    graphics.DrawImage(image, destRect, sourceRect, GraphicsUnit.Pixel);

                    thumbnailImage.Save(saveTo, System.Drawing.Imaging.ImageFormat.Jpeg);
                    saveTo.Position = 0;
                }
            }
            else
            {
                if (scaleMode == ScaleMode.Insert)
                    thumbnailImage = new Bitmap(thumbImage.Width, thumbImage.Height);
                else
                    thumbnailImage = new Bitmap(destRect.Width, destRect.Height);

                System.Drawing.Graphics graphics = System.Drawing.Graphics.FromImage(thumbnailImage);
                if (scaleMode == ScaleMode.Insert)
                    graphics.FillRectangle(new SolidBrush(Color.White), 0, 0, thumbImage.Width, thumbImage.Height);
                else
                    graphics.FillRectangle(new SolidBrush(Color.White), 0, 0, destRect.Width, destRect.Height);
                graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                graphics.DrawImage(image, destRect, sourceRect, GraphicsUnit.Pixel);

                thumbnailImage.Save(saveTo, System.Drawing.Imaging.ImageFormat.Jpeg);
                saveTo.Position = 0;
            }
            return true;
        }


        private static void GetImageSize(string path)
        {
            using (var bmp = new Bitmap(HttpContext.Current.Server.MapPath(path)))
            {
                _width = bmp.Width;
                _height = bmp.Height;
            }
        }

        public static string GetCachedImage(string originalPath, string fileName, ThumbnailPicture thumbnail)
        {
            if (string.IsNullOrEmpty(fileName) || !File.Exists(Path.Combine(HttpContext.Current.Server.MapPath(originalPath), fileName)))
            {
                return null;
            }
            string cacheFolder = thumbnail.CacheFolder;


            string result = Path.Combine("~/ImageCache/" + cacheFolder + "/", fileName);
            string cachePath = HttpContext.Current.Server.MapPath("~/ImageCache/" + cacheFolder);

            if (!Directory.Exists(cachePath)) Directory.CreateDirectory(cachePath);

            string cachedImagePath = Path.Combine(cachePath, fileName);
            if (File.Exists(cachedImagePath))
            {
                GetImageSize(result);
                return result;
            }

            if (CacheImage(originalPath, fileName, cacheFolder, thumbnail.PictureSize, thumbnail.ScaleMode, thumbnail.UseBackgroundImage, thumbnail.Offset))
            {
                GetImageSize(result);
                return result;
            }

            return null;
        }

        private static bool CacheImage(string originalPath, string fileName, string cacheFolder, PictureSize thumbnailImageSize, ScaleMode scaleMode, bool useBgImage, int delta)
        {
            string sourcePath = Path.Combine(HttpContext.Current.Server.MapPath(originalPath), fileName);
            Bitmap image;
            using (FileStream stream = new FileStream(sourcePath, FileMode.Open))
            {
                image = new Bitmap(stream);
            }

            string cachePath = HttpContext.Current.Server.MapPath("~/ImageCache/" + cacheFolder);
            if (!Directory.Exists(cachePath)) Directory.CreateDirectory(cachePath);
            string cachedImagePath = Path.Combine(cachePath, fileName);

            using (FileStream stream = new FileStream(cachedImagePath, FileMode.CreateNew))
            {
                return ScaleImage(cacheFolder, image, new Size(thumbnailImageSize.Width, thumbnailImageSize.Height), stream, scaleMode, useBgImage, delta);
            }
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="fileName"></param>
        /// <param name="file"></param>
        /// <param name="limitLength"></param>
        public static void SaveOriginalImage(string filePath, string fileName, HttpPostedFileBase file, int limitLength = 1000)
        {
            if (limitLength == 0)
            {
                file.SaveAs(filePath);
                return;
            }

            string tmpFilePath = HttpContext.Current.Server.MapPath("~/Content/tmpImages");
            tmpFilePath = Path.Combine(tmpFilePath, fileName);
            file.SaveAs(tmpFilePath);

            Bitmap image;
            string sourcePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Content/tmpImages"), fileName);
            using (FileStream stream = new FileStream(sourcePath, FileMode.Open))
            {
                image = new Bitmap(stream);
            }
            using (FileStream stream = new FileStream(filePath, FileMode.CreateNew))
            {
                ScaleAndSaveOriginalImage(limitLength, image, stream);
            }
            IOHelper.DeleteFile("~/Content/tmpImages", fileName);
        }

        public static void SaveOriginalImageWithDefinedDimentions(string filePath, string fileName, HttpPostedFileBase file, int destinationWidth, int destinationHeight, ScaleMode scaleMode)
        {
            string tmpFilePath = HttpContext.Current.Server.MapPath("~/Content/tmpImages");
            tmpFilePath = Path.Combine(tmpFilePath, fileName);
            file.SaveAs(tmpFilePath);

            Bitmap image;
            string sourcePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Content/tmpImages"), fileName);
            using (FileStream stream = new FileStream(sourcePath, FileMode.Open))
            {
                image = new Bitmap(stream);
            }
            using (FileStream stream = new FileStream(filePath, FileMode.CreateNew))
            {
                ScaleAndSaveOriginalImage(image, stream, destinationWidth, destinationHeight, scaleMode);
            }
            IOHelper.DeleteFile("~/Content/tmpImages", fileName);
        }


        public static void SaveCropPreview(string filePath, string fileName, HttpPostedFileBase file, int x, int y, int width, int height)
        {
            string tmpFilePath = HttpContext.Current.Server.MapPath("~/Content/tmpImages");
            tmpFilePath = Path.Combine(tmpFilePath, fileName);
            file.SaveAs(tmpFilePath);

            Bitmap image;
            string sourcePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Content/tmpImages"), fileName);
            using (FileStream stream = new FileStream(sourcePath, FileMode.Open))
            {
                image = new Bitmap(stream);
            }
            using (FileStream stream = new FileStream(filePath, FileMode.CreateNew))
            {
                SaveCropPreview(image, stream, x, y, width, height);
            }
            IOHelper.DeleteFile("~/Content/tmpImages", fileName);
        }



        public static string CachedImage(this HtmlHelper helper, string originalPath, string fileName, ThumbnailPicture thumbnail)
        {
            return CachedImage(helper, originalPath, fileName, thumbnail, null);
        }

        public static string CachedImage(this HtmlHelper helper, string originalPath, string fileName, ThumbnailPicture thumbnail, string className)
        {
            StringBuilder sb = new StringBuilder();
            string formatString = "<img src=\"{0}\" alt=\"{1}\" class=\"{2}\" width=\"{3}\" height=\"{4}\" />";
            //string formatString = "<img src=\"{0}\" alt=\"{1}\" class=\"{2}\" />";
            string imageSrc = GetCachedImage(originalPath, fileName, thumbnail);
            if (string.IsNullOrEmpty(imageSrc))
                //return string.Format("image file {0} not found", fileName);
                return string.Format("file not found", fileName);
            sb.AppendFormat(formatString, VirtualPathUtility.ToAbsolute(imageSrc ?? ""), fileName, className ?? "", _width, _height);
            return sb.ToString();
        }

        public static string CachedImage2(this HtmlHelper helper, string originalPath, string fileName, string fileName2, ThumbnailPicture thumbnail)
        {
            StringBuilder sb = new StringBuilder();
            string formatString = "<img src=\"{0}\" alt=\"{1}\" width=\"{2}\" height=\"{3}\" />";
            sb.AppendFormat(formatString, GetCachedImage(originalPath, fileName, thumbnail), fileName2, _width, _height);
            return sb.ToString();
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="originalPath"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public static string OriginalImage(this HtmlHelper helper, string originalPath, string fileName)
        {
            StringBuilder sb = new StringBuilder();
            string formatString = "<img src=\"{0}\" alt=\"{1}\" />";

            sb.AppendFormat(formatString, Path.Combine(originalPath, fileName), fileName);
            return sb.ToString();
        }

        public static string OriginalImageWitTitleAttribute(this HtmlHelper helper, string originalPath, string fileName, string title)
        {
            StringBuilder sb = new StringBuilder();
            string formatString = "<img src=\"{0}\" title=\"{1}\" />";

            sb.AppendFormat(formatString, Path.Combine(originalPath, fileName), title);
            return sb.ToString();
        }

        public static string OriginalImageWithDim(this HtmlHelper helper, string originalPath, string fileName, string className, string id)
        {
            StringBuilder sb = new StringBuilder();
            string formatString = "<img src=\"{0}\" alt=\"{1}\" width=\"{2}\" height=\"{3}\" class=\"{4}\" id=\"{5}\" />";

            string result = Path.Combine(originalPath, fileName);
            GetImageSize(result);

            sb.AppendFormat(formatString, Path.Combine(originalPath, fileName), fileName, _width, _height, className, id);
            return sb.ToString();
        }

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="originalPath"></param>
        ///// <param name="fileName"></param>
        ///// <param name="thumbnail"></param>
        ///// <param name="scaleMode"></param>
        //public static void SaveCachedImage(string originalPath, string fileName, ThumbnailPicture thumbnail, ScaleMode scaleMode)
        //{
        //    CacheImage(originalPath, fileName, thumbnail.CacheFolder, thumbnail.PictureSize, scaleMode, false, 0);
        //}

        public static void SaveCachedImage(string originalPath, string fileName, ThumbnailPicture thumbnail)
        {
            string cachePath = HttpContext.Current.Server.MapPath("~/ImageCache/" + thumbnail.CacheFolder);
            string cachedImagePath = Path.Combine(cachePath, fileName);
            if (!File.Exists(cachedImagePath))
            {
                CacheImage(originalPath, fileName, thumbnail.CacheFolder, thumbnail.PictureSize, thumbnail.ScaleMode, false, 0);
            }
        }


    }
}