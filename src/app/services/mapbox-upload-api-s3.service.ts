import { Injectable } from '@angular/core';
//import * as AWS from 'aws-sdk';

@Injectable()
export class MapboxUploadAPIS3Service {

  // Example credentials object returned from Mapbox
  credentials = {
    "bucket":"tilestream-tilesets-production",
    "key":"71/_pending/loalnu31ml23x960d4a7h76jc/anthonyrawlinsuom",
    "accessKeyId":"ASIAJJYWIPEIZ2WZC7DQ",
    "secretAccessKey":"QFE8ind4LYJA26EcDTYSN8WP2B4ynjp1sX/KDPTL",
    "sessionToken":"FQoDYXdzELf//////////wEaDJyIC16VM4lz2ceZ8CLTAkNz7cq/N15UIQDcflw4v6icU680Og3GV3O7FL7KrFSeAc1am3n/DORbt7z6WFfiA1COFQ+ZBRo1IWIfm98mH86vuCHLivDe4TFvTzq5VeXhMeJ11AN623X+jLsnKRwU7H6+EO9DB7XUccNHN5NPMjRSmXKEo4siHdU4SOv6kEfnHV8qRYCh2zHmfniCAL3u4C3ML7VC+Od+iCbKxgioscXsWL7g9P70DwVZQs1tePlrOx1RSQKuEewBakUfMn5ob1dvJ8bvtSZ8FkaddOs1mvpmCL4ieOgTre8tzgYQnW41zc8gG2J8z08QVNDFKk2UR0U++aefWvDTgnhvfcbY48Zj9jEOx6V46Vg9na7NfUQ2zgCiPdlKxbdd1tuCYVjawSpCo9Rk3NHpCKGhSghFLT9kGr0kqI+en04pRbOgRQyK2hiBwc06a4jR9r3KUJI2Gdx+NSjglbXMBQ==",
    "url":"https://tilestream-tilesets-production.s3.amazonaws.com/71/_pending/loalnu31ml23x960d4a7h76jc/anthonyrawlinsuom"
  }

  private accessToken = 'sk.eyJ1IjoiYW50aG9ueXJhd2xpbnN1b20iLCJhIjoiY2o2N2g1empqMDVidjMycnA0NDg2NHFxcSJ9.J3AhcZ0L0HnWcwWdH-phiA';
  private credentialsURL = 'https://api.mapbox.com/uploads/v1/anthonyrawlinsuom/credentials?access_token='+this.accessToken;

  // TODO
  client:any;
  fs:any;

  constructor() {

   }


   /*
   sendToMapbox(file:any) {
     this.client.createUploadCredentials(function(err, credentials) {
       // Use aws-sdk to stage the file on Amazon S3
       var s3 = new AWS.S3({
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            region: 'us-east-1'
       });
       s3.putObject({
         Bucket: credentials.bucket,
         Key: credentials.key,
         Body: this.fs.createReadStream(file)
       }, function(err, resp) {
       });
     });

   }
   */
}
