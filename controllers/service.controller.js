var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'RotexPaint.Service@gmail.com',
        pass: 'hoang090'
    }
})

module.exports.index = function (req, res, next) {
    res.render('service/index');
}
module.exports.service = function (req, res, next) {
    const service = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        note: req.body.note
    }
    var message = '';
    for (let key in service) {
        if (key !== 'note') {
            message += `<p>${key}: ${service[key]}</p>`;
        }
    }
    message += `<p>Câu hỏi: ${service.note}</p>`;
    const mailOptions = {
        from: 'RotexPaint.Service@gmail.com', // sender address
        to: 'Sonvanduc668@gmail.com', // list of receivers
        subject: 'Câu hỏi Dịch vụ', // Subject line
        html: message// plain text body
    };
    var submit = {
        message: ''
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
    submit.message = 'Cảm ơn bạn, chúng tôi sẽ trả lời nhanh nhất có thể!';
    console.log(submit);
    res.render('service/index', {
        submit: submit
    });

}