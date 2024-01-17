const resetMailTemplate = (email: string, name: string, url: string) => {

    return `
  
    <!DOCTYPE html>
    <html>
      <head>
        <title></title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
          body,
          table,
          td,
          a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          table {
            border-collapse: collapse !important;
          }
          body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          @media screen and (max-width: 525px) {
            .wrapper {
              width: 100% !important;
              max-width: 100% !important;
            }
            .responsive-table {
              width: 100% !important;
            }
            .padding {
              padding: 10px 5% 15px 5% !important;
            }
            .section-padding {
              padding: 0 15px 50px 15px !important;
            }
          }
          .form-container {
            margin-bottom: 24px;
            padding: 20px;
            border: 1px dashed #ccc;
            font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
          }
          .form-heading {
            color: #2a2a2a;
            font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
            font-weight: 700;
            text-align: left;
            line-height: 20px;
            font-size: 15px;
            margin: 0 0 8px;
            padding: 0;
          }
    
          .form-title {
            color: #2a2a2a;
            font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
            font-weight: 500;
            text-align: left;
            font-size: 25px;
            padding: 1rem 0 1rem 0;
          }
    
          .powered-by{
            font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
          }
    
          .established-by{
            font-size: 13px;
            font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
          }
    
          .form-answer {
            color: #2a2a2a;
            font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
            font-weight: 300;
            text-align: left;
            line-height: 20px;
            font-size: 16px;
            margin: 0 0 24px;
            padding: 0;
          }
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
  
          .sponsor-img{
              width: 13rem;
          }
        </style>
      </head>
      <body style="margin: 0 !important; padding: 0 !important; background: #fff">
        <div
          style="
            display: none;
            font-size: 1px;
            color: #fefefe;
            line-height: 1px;
            max-height: 0px;
            max-width: 0px;
            opacity: 0;
            overflow: hidden;
          "
        ></div>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td
              bgcolor="#ffffff"
              align="center"
              style="padding: 10px 15px 30px 15px"
              class="section-padding"
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 500px"
                class="responsive-table"
              >
                <tr>
                  <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tr>
                              <td
                                style="
                                  padding: 0 0 0 0;
                                  font-size: 16px;
                                  line-height: 25px;
                                  color: #232323;
                                "
                                class="padding message-content"
                              >
    
    
                          
                                 
                                  <h2 class="form-title">Reset Your Password Service</h2>
    
                                <div class="form-container">
                                  <h3 class="form-heading">Name</h3>
                                  <p class="form-answer">${name}</p>
    
  
                                  <h3 class="form-heading">Email</h3> 
                                  <p class="form-answer">${email}
  
                                  <h3 class="form-heading">Rest Your password form here</h3>
                                  <p class="form-answer">${url}</p>
                                  
  
                                </div>
                              </td>
                            </tr>
                          </table>
    
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0">
                            <tr>
                              <div class="powered-by">
                                Organized by Ibrahim Mohamed
                              </div>
                              
                              <br/>
                              <div class="established-by">
                                Sponsored by
                                <br/><br/>
                              <img class="sponsor-img" src="https://i.postimg.cc/Dycj2J3N/3rd.png"/></div>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
};

export default resetMailTemplate;
