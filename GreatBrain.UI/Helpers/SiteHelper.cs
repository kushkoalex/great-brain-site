using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GreatBrain.UI.Helpers
{
    public static class SiteHelper
    {
        public static string UpdatePageWebName(this string source)
        {
            if (source == null)
            {
                throw new ArgumentException("Web page name cannot be null");
            }
            return source.ToLower().Replace(" ", "-").Replace("'", "").Replace("\"", "").Trim();
        }

    }
}