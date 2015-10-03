using System;
using System.Data.Entity.Validation;
using System.Linq;

namespace GreatBrain.UI.Helpers
{
    public static class ExceptionHelper
    {
        public static string GetEntityValidationException(this Exception ex)
        {
            string errorMessage = string.Empty;
            var exception = ex as DbEntityValidationException;
            if (exception != null)
            {
                if (exception.EntityValidationErrors.Any())
                {
                    foreach (var error in exception.EntityValidationErrors)
                    {
                        if (error.ValidationErrors.Any())
                        {
                            foreach (var dbValidationError in error.ValidationErrors)
                            {
                                errorMessage += dbValidationError.ErrorMessage + " ";
                            }
                        }
                    }
                }
            }

            return errorMessage;
        }
    }
}