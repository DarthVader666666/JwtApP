FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_URLS=http://+:80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["JwtApp.csproj", "."]

RUN dotnet restore "./././JwtApp.csproj"
COPY . .

WORKDIR "/src/."
RUN dotnet build "./JwtApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "./JwtApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "JwtApp.dll", "--environment=Development"]

