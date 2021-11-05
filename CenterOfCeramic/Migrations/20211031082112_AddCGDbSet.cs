using Microsoft.EntityFrameworkCore.Migrations;

namespace CenterOfCeramic.Migrations
{
    public partial class AddCGDbSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ColorGroup_ColorGroupId",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ColorGroup",
                table: "ColorGroup");

            migrationBuilder.RenameTable(
                name: "ColorGroup",
                newName: "ColorGroups");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ColorGroups",
                table: "ColorGroups",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ColorGroups_ColorGroupId",
                table: "Products",
                column: "ColorGroupId",
                principalTable: "ColorGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ColorGroups_ColorGroupId",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ColorGroups",
                table: "ColorGroups");

            migrationBuilder.RenameTable(
                name: "ColorGroups",
                newName: "ColorGroup");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ColorGroup",
                table: "ColorGroup",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ColorGroup_ColorGroupId",
                table: "Products",
                column: "ColorGroupId",
                principalTable: "ColorGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
