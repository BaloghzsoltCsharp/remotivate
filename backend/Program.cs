using System.Text;
using System.Text.Json.Serialization;
using backend.Data;
using backend.Models;
using backend.Services.Authenticators;
using backend.Services.PasswordHashers;
using backend.Services.DateServiceLayer;
using backend.Services.ProjectServiceLayer;
using backend.Services.RefreshTokenServiceLayer;
using backend.Services.TaskServiceLayer;
using backend.Services.TokenGenerators;
using backend.Services.TokenValidators;
using backend.Services.UserServiceLayer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<RemotivateContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllersWithViews();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(b =>
    {
        b.WithOrigins(new[] {"http://localhost:3000", "https://localhost:7029"})
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var configuration = builder.Configuration;

//deserializing appsettings values to c# objects
var authenticationConfiguration = new AuthenticationConfiguration();
configuration.Bind("Authentication", authenticationConfiguration);

//register
builder.Services.AddSingleton(authenticationConfiguration);

builder.Services.AddSingleton<AccessTokenGenerator>();
builder.Services.AddSingleton<RefreshTokenGenerator>();
builder.Services.AddSingleton<RefreshTokenValidator>();
builder.Services.AddSingleton<Authenticator>();
builder.Services.AddSingleton<TokenGenerator>();
builder.Services.AddSingleton<IPasswordHasher, BcryptPasswordHasher>();
builder.Services.AddSingleton<IRefreshTokenService, InMemoryRefreshTokenService>();

builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDateService, DateService>();

// builder.Services.AddAuthentication(o =>
// {
//     o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//     o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
// }).AddCookie(o =>
// {
//     o.Cookie.Name = "token";
//
// }).AddJwtBearer(o =>
// {
//     o.RequireHttpsMetadata = false;
//     o.SaveToken = true;
//     o.TokenValidationParameters = new TokenValidationParameters()
//     {
//         IssuerSigningKey =
//             new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationConfiguration.AccessTokenSecret)),
//         ValidIssuer = authenticationConfiguration.Issuer,
//         ValidAudience = authenticationConfiguration.Audience,
//         ValidateIssuerSigningKey = true,
//         ValidateIssuer = true,
//         ValidateAudience = true,
//         ClockSkew = TimeSpan.Zero
//     };
//     o.Events = new JwtBearerEvents
//     {
//         OnMessageReceived = context =>
//         {
//             context.Token = context.Request.Cookies["X-Access-Token"];
//             return Task.CompletedTask;
//         }
//     };
//
// });

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters()
    {
        IssuerSigningKey =
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationConfiguration.AccessTokenSecret)),
        ValidIssuer = authenticationConfiguration.Issuer,
        ValidAudience = authenticationConfiguration.Audience,
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddControllers().AddNewtonsoftJson(options => 
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

// builder.Services.AddControllers().AddJsonOptions(options =>
// {
//     options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
// });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();

});

app.MapControllers();

app.Run();