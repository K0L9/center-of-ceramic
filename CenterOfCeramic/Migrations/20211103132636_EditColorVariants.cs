using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace CenterOfCeramic.Migrations
{
    public partial class EditColorVariants : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ColorGroups_ColorGroupId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "ColorGroups");

            migrationBuilder.DropIndex(
                name: "IX_Products_ColorGroupId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ColorGroupId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ColorInGroup",
                table: "Products");

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "Products",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "IdentifierNumber",
                table: "Products",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ColorVariantId",
                table: "Photos",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ColorVariants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ColorHex = table.Column<string>(type: "text", nullable: true),
                    ProductId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColorVariants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ColorVariants_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_ColorVariantId",
                table: "Photos",
                column: "ColorVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_ColorVariants_ProductId",
                table: "ColorVariants",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_ColorVariants_ColorVariantId",
                table: "Photos",
                column: "ColorVariantId",
                principalTable: "ColorVariants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_ColorVariants_ColorVariantId",
                table: "Photos");

            migrationBuilder.DropTable(
                name: "ColorVariants");

            migrationBuilder.DropIndex(
                name: "IX_Photos_ColorVariantId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "IdentifierNumber",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ColorVariantId",
                table: "Photos");

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "Products",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

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
                name: "ColorGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColorGroups", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_ColorGroupId",
                table: "Products",
                column: "ColorGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ColorGroups_ColorGroupId",
                table: "Products",
                column: "ColorGroupId",
                principalTable: "ColorGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
