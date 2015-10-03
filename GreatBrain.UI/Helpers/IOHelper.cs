using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Web;

namespace GreatBrain.UI.Helpers
{
    public static class IOHelper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="relativePath"></param>
        /// <param name="fileName"></param>
        public static void DeleteFile(string relativePath, string fileName)
        {
            string absolutePath = HttpContext.Current.Server.MapPath(relativePath);
            string path = Path.Combine(absolutePath, fileName);
            if (File.Exists(path))
                File.Delete(path);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="relativePath"></param>
        /// <param name="fileNames"></param>
        public static void DeleteFiles(string relativePath, string[] fileNames)
        {
            foreach (var fileName in fileNames)
            {
                DeleteFile(relativePath, fileName);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="relativePath"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public static string CreateAbsolutePath(string relativePath, string fileName)
        {
            return Path.Combine(HttpContext.Current.Server.MapPath(relativePath), fileName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="relativePath"></param>
        /// <param name="clientPath"> </param>
        /// <returns></returns>
        public static string GetUniqueFileName(string relativePath, string clientPath)
        {
            string initialName = Path.GetFileName(clientPath);

            if (initialName == null)
            {
                throw new Exception("Невозможно определить имя файла " + clientPath);
            }

            initialName = Regex.Replace(initialName, @"[^a-zA-Z0-9._]", "");

            string result = initialName;

            string filePath = HttpContext.Current.Server.MapPath(relativePath);

            filePath = Path.Combine(filePath, initialName);

            if (File.Exists(filePath))
            {
                string newFileName = MakeNewFileName(initialName);
                result = GetUniqueFileName(relativePath, newFileName);
            }
            return result;
        }

        private static string MakeNewFileName(string fileName)
        {
            string result = fileName;
            if (Path.HasExtension(fileName))
            {

                string ext = Path.GetExtension(fileName);
                result = Path.GetFileNameWithoutExtension(fileName) + "1" + ext;
            }
            else
                result += "1";
            return result;
        }
    }
}