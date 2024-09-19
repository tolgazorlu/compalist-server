require("dotenv").config(); // IMPORT .env file.
const Mailjet = require("node-mailjet"); // IMPORT Mailjet
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
);

const verifyEmail = async (email: string, username: string, link: string) => {
    const template = `
    <!DOCTYPE html>

    <html
      lang="en"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:v="urn:schemas-microsoft-com:vml"
    >
      <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <!--[if mso
          ]><xml
            ><o:OfficeDocumentSettings
              ><o:PixelsPerInch>96</o:PixelsPerInch
              ><o:AllowPNG /></o:OfficeDocumentSettings></xml
        ><![endif]-->
        <!--[if !mso]><!-->
        <!--<![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
    
          body {
            margin: 0;
            padding: 0;
          }
    
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
    
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
    
          p {
            line-height: inherit;
          }
    
          .desktop_hide,
          .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
          }
    
          .image_block img + div {
            display: none;
          }
    
          @media (max-width: 620px) {
            .desktop_hide table.icons-inner,
            .social_block.desktop_hide .social-table {
              display: inline-block !important;
            }
    
            .icons-inner {
              text-align: center;
            }
    
            .icons-inner td {
              margin: 0 auto;
            }
    
            .mobile_hide {
              display: none;
            }
    
            .row-content {
              width: 100% !important;
            }
    
            .stack .column {
              width: 100%;
              display: block;
            }
    
            .mobile_hide {
              min-height: 0;
              max-height: 0;
              max-width: 0;
              overflow: hidden;
              font-size: 0px;
            }
    
            .desktop_hide,
            .desktop_hide table {
              display: table !important;
              max-height: none !important;
            }
          }
        </style>
      </head>
      <body
        style="
          background-color: #ffffff;
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        "
      >
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          class="nl-container"
          role="presentation"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            background-color: #ffffff;
          "
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-1"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            color: #000000;
                            width: 600px;
                            margin: 0 auto;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  padding-bottom: 5px;
                                  padding-top: 5px;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="image_block block-1"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        width: 100%;
                                        padding-right: 0px;
                                        padding-left: 0px;
                                      "
                                    >
                                      <div
                                        align="center"
                                        class="alignment"
                                        style="line-height: 10px"
                                      >
                                        <div style="max-width: 330px">
                                          <img
                                            height="auto"
                                            src="https://i.hizliresim.com/qcilm9s.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                              width: 100%;
                                            "
                                            width="330"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-2"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #013399;
                    background-size: auto;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            background-size: auto;
                            color: #000000;
                            width: 600px;
                            margin: 0 auto;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  padding-bottom: 5px;
                                  padding-top: 5px;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <div
                                  class="spacer_block block-1"
                                  style="
                                    height: 20px;
                                    line-height: 20px;
                                    font-size: 1px;
                                  "
                                >
                                   
                                </div>
                                <div
                                  class="spacer_block block-1"
                                  style="
                                    height: 20px;
                                    line-height: 20px;
                                    font-size: 1px;
                                  "
                                >
                                   
                                </div>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="image_block block-2"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        width: 100%;
                                        padding-right: 0px;
                                        padding-left: 0px;
                                      "
                                    >
                                      <div
                                        align="center"
                                        class="alignment"
                                        style="line-height: 10px"
                                      >
                                        <div style="max-width: 60px">
                                          <img
                                            height="auto"
                                            src="https://i.hizliresim.com/pnv8s8u.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                              width: 100%;
                                            "
                                            width="60"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <div
                                  class="spacer_block block-3"
                                  style="
                                    height: 20px;
                                    line-height: 20px;
                                    font-size: 1px;
                                  "
                                >
                                   
                                </div>
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="text_block block-4"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td class="pad">
                                      <div style="font-family: sans-serif">
                                        <div
                                          class=""
                                          style="
                                            font-size: 12px;
                                            font-family: Arial, Helvetica,
                                              sans-serif;
                                            mso-line-height-alt: 14.399999999999999px;
                                            color: #fff;
                                            line-height: 1.2;
                                          "
                                        >
                                          <p
                                            style="
                                            color: #fff;
                                              margin: 0;
                                              font-size: 30px;
                                              text-align: center;
                                              mso-line-height-alt: 45.6px;
                                            "
                                          >
                                            <strong>Sayın ${username}</strong>
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-3"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #fff;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            color: #000000;
                            width: 600px;
                            margin: 0 auto;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  padding-bottom: 5px;
                                  padding-top: 5px;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="text_block block-2"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td class="pad">
                                      <div style="font-family: Arial, sans-serif">
                                        <div
                                          class=""
                                          style="
                                            font-size: 12px;
                                            font-family: Arial, 'Helvetica Neue',
                                              Helvetica, sans-serif;
                                            mso-line-height-alt: 14.399999999999999px;
                                            color: #555;
                                            line-height: 1.2;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: center;
                                              mso-line-height-alt: 16.8px;
                                            "
                                          >
                                            <span
                                              style="
                                                font-size: 20px;
                                                font-weight: bold;
                                              "
                                              >Merhaba,</span
                                            >
                                            <br />
                                            <br />
                                            <span style="font-size: 18px"
                                              >Bu mesajı e-posta adresiniz sitemize
                                              kayıtlı olduğu için aldınız. E-posta
                                              adresinizi doğrulamak ve bu hesabın
                                              sahibi olduğunuzu onaylamak için
                                              lütfen aşağıdaki düğmeyi tıklayın.
                                              Eğer bize kaydolmadıysanız, lütfen bu
                                              e-postayı dikkate almayın.</span
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <div
                                    class="spacer_block block-4"
                                    style="
                                      height: 20px;
                                      line-height: 20px;
                                      font-size: 1px;
                                    "
                                  >
                                     
                                  </div>
                                </table>
    
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="button_block block-3"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td class="pad">
                                      <div align="center" class="alignment">
                                        <a
                                          style="
                                            text-decoration: none;
                                            display: inline-block;
                                            color: #ffffff;
                                            background-color: #013399;
                                            border-radius: 4px;
                                            width: auto;
                                            border-top: 0px solid transparent;
                                            font-weight: undefined;
                                            border-right: 0px solid transparent;
                                            border-bottom: 0px solid transparent;
                                            border-left: 0px solid transparent;
                                            padding-top: 5px;
                                            padding-bottom: 5px;
                                            font-family: Arial, Helvetica,
                                              sans-serif;
                                            font-size: 16px;
                                            text-align: center;
                                            mso-border-alt: none;
                                            word-break: keep-all;
                                          "
                                          href=${link}
                                        >
                                          <span
                                            style="
                                              padding-left: 20px;
                                              padding-right: 20px;
                                              font-size: 16px;
                                              display: inline-block;
                                              letter-spacing: normal;
                                            "
                                            ><span
                                              style="
                                                word-break: break-word;
                                                line-height: 32px;
                                              "
                                              >Onayla</span
                                            ></span
                                          >
                                        </a>
                                        <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                      </div>
                                    </td>
                                  </tr>
                                </table>
    
                                <div
                                  class="spacer_block block-4"
                                  style="
                                    height: 20px;
                                    line-height: 20px;
                                    font-size: 1px;
                                  "
                                >
                                   
                                </div>
                                <div
                                  class="spacer_block block-4"
                                  style="
                                    height: 20px;
                                    line-height: 20px;
                                    font-size: 1px;
                                  "
                                >
                                   
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-4"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #e5eaf5;
                    text-align: center;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          border="0"
                          cellpadding="10"
                          cellspacing="0"
                          class="social_block block-5"
                          role="presentation"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                          width="100%"
                        >
                          <tr>
                            <td class="pad">
                              <div
                                class="spacer_block block-1"
                                style="
                                  height: 20px;
                                  line-height: 20px;
                                  font-size: 1px;
                                "
                              >
                                 
                              </div>
                              <span style="font-weight: 600; color: #555"
                                >Bize Ulaşın</span
                              >
                              <div
                                class="spacer_block block-1"
                                style="
                                  height: 20px;
                                  line-height: 20px;
                                  font-size: 1px;
                                "
                              >
                                 
                              </div>
                              <div align="center" class="alignment">
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="social-table"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    display: inline-block;
                                  "
                                  width="180px"
                                >
                                  <tr>
                                    <td style="padding: 0 2px 0 2px">
                                      <a
                                        href="https://www.twitter.com/"
                                        target="_blank"
                                        ><img
                                          alt="Twitter"
                                          height="auto"
                                          src="https://i.hizliresim.com/szchtix.png"
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                          "
                                          title="twitter"
                                          width="32"
                                      /></a>
                                    </td>
                                    <td style="padding: 0 2px 0 2px">
                                      <a
                                        href="https://www.linkedin.com/"
                                        target="_blank"
                                        ><img
                                          alt="Linkedin"
                                          height="auto"
                                          src="https://i.hizliresim.com/kcwsio3.png"
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                          "
                                          title="linkedin"
                                          width="32"
                                      /></a>
                                    </td>
                                    <td style="padding: 0 2px 0 2px">
                                      <a
                                        href="https://www.instagram.com/"
                                        target="_blank"
                                        ><img
                                          alt="Instagram"
                                          height="auto"
                                          src="https://i.hizliresim.com/s3wgcxk.png"
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                          "
                                          title="instagram"
                                          width="32"
                                      /></a>
                                    </td>
                                    <td style="padding: 0 2px 0 2px">
                                      <a
                                        href="https://www.youtube.com/"
                                        target="_blank"
                                        ><img
                                          alt="YouTube"
                                          height="auto"
                                          src="https://i.hizliresim.com/9obmbae.png"
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                          "
                                          title="YouTube"
                                          width="32"
                                      /></a>
                                    </td>
                                    <td style="padding: 0 2px 0 2px">
                                      <a href="mailto:" target="_blank"
                                        ><img
                                          alt="E-Mail"
                                          height="auto"
                                          src="https://i.hizliresim.com/fzlva3q.png"
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                          "
                                          title="E-Mail"
                                          width="32"
                                      /></a>
                                    </td>
                                  </tr>
                                </table>
                              </div>
    
                              <div
                                class="spacer_block block-1"
                                style="
                                  height: 20px;
                                  line-height: 20px;
                                  font-size: 1px;
                                "
                              >
                                 
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-4"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #013399;
                    text-align: center;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          border="0"
                          cellpadding="10"
                          cellspacing="0"
                          class="social_block block-5"
                          role="presentation"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                          width="100%"
                        >
                          <tr>
                            <td class="pad">
                              <div
                                class="spacer_block block-1"
                                style="
                                  height: 20px;
                                  line-height: 20px;
                                  font-size: 1px;
                                "
                              >
                                 
                              </div>
                              <span
                                style="
                                  font-weight: 600;
                                  color: #fff;
                                  font-family: Cambria, Cochin, Georgia, Times,
                                    'Times New Roman', serif;
                                "
                                >Copyrights © Compalist All Rights Reserved</span
                              >
    
                              <div
                                class="spacer_block block-1"
                                style="
                                  height: 20px;
                                  line-height: 20px;
                                  font-size: 1px;
                                "
                              >
                                 
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End -->
      </body>
    </html>
    
  `;

    const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: process.env.EMAIL_ACCOUNT,
                    Name: process.env.EMAIL_NAME,
                },
                To: [
                    {
                        Email: email,
                        Name: username,
                    },
                ],
                Subject: "Greetings from Mailjet.",
                TextPart: "My first Mailjet email",
                HTMLPart: template,
                CustomID: "AppGettingStartedTest",
            },
        ],
    });

    request
        .then((result: { body: any }) => {
            console.log(result.body);
        })
        .catch((err: { statusCode: any }) => {
            console.log(err.statusCode);
        });
};

module.exports = { verifyEmail };
