using Microsoft.EntityFrameworkCore.Migrations;

namespace CenterOfCeramic.Migrations
{
    public partial class EditIndetifyNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdentifierNumber",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "IdentifierNumber",
                table: "ColorVariants",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdentifierNumber",
                table: "ColorVariants");

            migrationBuilder.AddColumn<int>(
                name: "IdentifierNumber",
                table: "Products",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
