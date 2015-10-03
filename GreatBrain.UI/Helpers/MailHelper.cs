using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Web;
//using NewVision.UI.Models;

namespace NewVision.UI.Helpers
{
    //public class MailHelper
    //{
    //    public static void Notify(FeedbackForm feedbackForm)
    //    {
    //        string[] mailTo = ConfigurationManager.AppSettings["mailTo"].Split(new[] { " ", ";", "," }, StringSplitOptions.RemoveEmptyEntries);
    //        SmtpClient client = new SmtpClient();
    //        MailMessage message = new MailMessage();
    //        foreach (var mailAddress in mailTo)
    //        {
    //            message.To.Add(mailAddress);
    //        }
    //        message.Subject = "New Vision Pro — форма обратной связи";
    //        message.Body =
    //            string.Format(
    //                "<div><div>Имя: {0}</div><div>Email: {1}</div><div>Сообщение: {2}</div>",
    //                feedbackForm.Name,
    //                feedbackForm.Email,
    //                feedbackForm.Question);
    //        message.IsBodyHtml = true;
    //        //#if !DEBUG
    //        client.Send(message);
    //        //#endif
    //        message.Dispose();
    //    }
    //}
}