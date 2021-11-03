#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
EXPOSE 80
EXPOSE 443
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
COPY . /app
WORKDIR /app
RUN dotnet restore "CenterOfCeramic.csproj"
RUN dotnet build "CenterOfCeramic.csproj" -c Release -o /app/build
FROM build AS publish
RUN dotnet publish "CenterOfCeramic.csproj" -c Release -o /app/publish
FROM base AS final
COPY --from=publish /app/publish .
COPY client-app/multikart_react_all_in_one/backend/build/. client-app/multikart_react_all_in_one/backend/build/
ENTRYPOINT ["dotnet", "CenterOfCeramic.dll"]
