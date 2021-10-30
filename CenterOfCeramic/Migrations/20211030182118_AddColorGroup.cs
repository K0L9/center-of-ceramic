using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace CenterOfCeramic.Migrations
{
    public partial class AddColorGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ColorGroupId",
                table: "Products",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ColorInGroup",
                table: "Products",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ColorGroup",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColorGroup", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_ColorGroupId",
                table: "Products",
                column: "ColorGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ColorGroup_ColorGroupId",
                table: "Products",
                column: "ColorGroupId",
                principalTable: "ColorGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ColorGroup_ColorGroupId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "ColorGroup");

            migrationBuilder.DropIndex(
                name: "IX_Products_ColorGroupId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ColorGroupId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ColorInGroup",
                table: "Products");
        }
    }
}
