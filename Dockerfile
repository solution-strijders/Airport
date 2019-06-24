FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY airport/*.csproj ./airport/
RUN dotnet restore

# copy everything else and build app
COPY airport/. ./airport/
WORKDIR /app/airport
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS runtime
WORKDIR /app
COPY --from=build /app/airport/out ./
ENTRYPOINT ["dotnet", "airport.dll"]