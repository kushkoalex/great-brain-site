using System.Collections.Generic;
namespace GreatBrain.UI.Helpers
{


    public class SiteContentHelper
    {
        public static string[] ServiceContentTypes = { "education", "organize" };
        public static string[] ServiceContentTypesTitle = { "Образовательные", "Организационные" };

        public static Dictionary<string, string> Gender = new Dictionary<string, string>() { { "both", "Совместное обучение" }, { "male", "Только для мальчиков" } };
        public static Dictionary<string, string> Type = new Dictionary<string, string>() { { "school", "Школа" }, { "highSchool", "Высшая школа" } };
    }
}