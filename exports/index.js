
module.exports = {
    getIp: function(req){
        var geoip = require('geoip-lite');
        var date = new Date();
        var ip = req.headers["cf-connecting-ip"];
        var geo = geoip.lookup(ip);
        var text =
        "\n" +
        `New visitor at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}` +     "\n" +    "\n" +
        'Headers: ' + JSON.stringify(req.headers) +    "\n" + "\n" +
        'IP: ' + (ip ? ip: "Unknown") +    "\n" +"\n" +
        // 'ISP: ' + (ISP ? ISP: "Unknown") +    "\n" +"\n" +
        "Browser: " + req.headers["user-agent"] +    "\n" +
        "Language: " + req.headers["accept-language"] +    "\n" +"\n" +
        "Country: " + (geo ? geo.country: "Unknown") +    "\n" +"\n" +
        "Region: " + (geo ? geo.region: "Unknown") +    "\n" +"\n" +
        "City: " + (geo ? geo.city:"Unknown")+    "\n" +"\n" +
        "Coordinates: " + (geo ? geo.ll:"Unknown") +    "\n" +"\n" +
        "Metro: " + (geo ? geo.metro:"Unknown") +    "\n" +"\n" +
        "Area: " + (geo ? geo.area:"Unknown") +    "\n" +"\n"

        // console.log(text)
        return text;
    },
    email: function(subject, text){
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            pool: false,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        var mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: process.env.EMAIL_ADDRESS,
            subject: subject,
            text: text,
        };
        transporter.sendMail(mailOptions,
            function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Email number sent: ${info.response}` );
                }
        });
    },
    isNotFromEU: function(countryCode){
        var countries = ['AT', 'BE', 'HR', 'BG', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
        'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE']
        if(countries.indexOf(countryCode) !== -1) {
            // Is an EU country
            return false;
        }
        // Is not an EU country
        return true;
    }
}

