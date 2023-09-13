const html = String.raw;

export const emailtemplate = (approvalCode, username, password) =>
html `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Application Confirmation</title>
    </head>

    <body id="receipt" style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Roboto, Arial, Helvetica, sans-serif;">
        <table style="width: 100%;">
            <table style="width: 100%;">
                <th><img src="https://tlcfinancingny.com/wp-content/uploads/2018/07/tlc-logo-sticky.png" alt="" /></th>
            </table>

            <table style="width: 100%; background-color: #e5e7eb;">
                <th>
                    <span style="font-size: 25px;">Application Confirmed</span><br />
                    <br />
                    Your applicaiton has been approved
                </th>
            </table>
            <table style="margin: 0 auto; width: 75%; line-height: 30px; color: #1d1d1d; font-size: 18px;">
                <tr>
                    <td>Your approval code is:<span style="font-weight: bold;"> ${approvalCode}</span>. Please keep this safe for your records. Bring this code to one of our dealers to move to next step.</td>
             
                    </tr>
                    <tr><td>These are your login credentials</td></tr>
                    <tr>   <td>Username=${username} Password=${password}</td></tr>
                <br />
            </table>
        </table>

        <table style="height: 25px; width: 100%; background-color: #333333; margin-top: 40px;"></table>
    </body>
</html>
`