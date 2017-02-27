using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BlueoceanMVC.Startup))]
namespace BlueoceanMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
