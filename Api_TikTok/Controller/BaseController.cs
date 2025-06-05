using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace Api_TikTok.Controller
{
    public class BaseController : ControllerBase
    {
        protected int GetUserIdFromClaims()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0;
            }
            return 0;
        }
    }
}
