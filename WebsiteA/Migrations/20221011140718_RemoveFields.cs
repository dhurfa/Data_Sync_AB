using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectDataEntry.Migrations
{
    public partial class RemoveFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Entries");

            migrationBuilder.DropColumn(
                name: "Contact",
                table: "Entries");

            migrationBuilder.DropColumn(
                name: "PAN",
                table: "Entries");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Entries");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Entries",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Contact",
                table: "Entries",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PAN",
                table: "Entries",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Entries",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
