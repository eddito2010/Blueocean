namespace BlueoceanMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addFieldsUsers : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Names", c => c.String());
            AddColumn("dbo.Users", "LastNames", c => c.String());
            AddColumn("dbo.Users", "Ci", c => c.String());
            AddColumn("dbo.Users", "TlfConv", c => c.String());
            AddColumn("dbo.Users", "TlfCel", c => c.String());
            AddColumn("dbo.Users", "ReceiveEmail", c => c.Boolean());
            AddColumn("dbo.Users", "StatesId", c => c.Int());
            AddColumn("dbo.Users", "CitiesId", c => c.Int());
            AddColumn("dbo.Users", "Sex", c => c.Int());
            AddColumn("dbo.Users", "BirthDate", c => c.DateTime());
            AddColumn("dbo.Users", "MainStreet", c => c.String());
            AddColumn("dbo.Users", "SecondStreet", c => c.String());
            AddColumn("dbo.Users", "Apartment", c => c.String());
            AddColumn("dbo.Users", "Reference", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "Reference");
            DropColumn("dbo.Users", "Apartment");
            DropColumn("dbo.Users", "SecondStreet");
            DropColumn("dbo.Users", "MainStreet");
            DropColumn("dbo.Users", "BirthDate");
            DropColumn("dbo.Users", "Sex");
            DropColumn("dbo.Users", "CitiesId");
            DropColumn("dbo.Users", "StatesId");
            DropColumn("dbo.Users", "ReceiveEmail");
            DropColumn("dbo.Users", "TlfCel");
            DropColumn("dbo.Users", "TlfConv");
            DropColumn("dbo.Users", "Ci");
            DropColumn("dbo.Users", "LastNames");
            DropColumn("dbo.Users", "Names");
        }
    }
}
