import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Injectable({
    providedIn: 'root',
})
export class OpenViduService {
    OPENVIDU_SERVER_URL = 'https://192.168.219.101:4443'; //Server ip 입력
    MY_SECRET = 'MY_SECRET';
    ANDROID_PERMISSIONS = [
        'android.permission.CAMERA',
        'android.permission.RECORD_AUDIO',
        'android.permission.MODIFY_AUDIO_SETTINGS',
        'android.permission.BLUETOOTH',
        'android.permission.BLUETOOTH_ADMIN'
    ];

    constructor(private http: HttpClient, private androidPermissions: AndroidPermissions) {}

    getToken(mySessionId: string): Promise<string> {
        return this.createSession(mySessionId, this.OPENVIDU_SERVER_URL, this.MY_SECRET).then((sessionId: string) => {
            return this.createToken(sessionId, this.OPENVIDU_SERVER_URL, this.MY_SECRET);
        });
    }

    createSession(sessionId: string, openviduServerUrl: string, openviduSecret: string) {
        return new Promise((resolve, reject) => {
            const body = JSON.stringify({ customSessionId: sessionId });
            const options = {
                headers: new HttpHeaders({
                    'Authorization': 'Basic ' + btoa('OPENVIDUAPP:' + openviduSecret),
                    'Content-Type': 'application/json',
                }),
            };
            return this.http
                .post<any>(openviduServerUrl + '/openvidu/api/sessions', body, options)
                .pipe(
                    catchError((error) => {
                        error.status === 409 ? resolve(sessionId) : reject(error);
                        return observableThrowError(error);
                    }),
                )
                .subscribe((response) => {
                    console.log(response);
                    resolve(response.id);
                });
        });
    }

    createToken(sessionId: string, openviduServerUrl: string, openviduSecret: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const body = JSON.stringify({});
            const options = {
                headers: new HttpHeaders({
                    'Authorization': 'Basic ' + btoa('OPENVIDUAPP:' + openviduSecret),
                    'Content-Type': 'application/json',
                }),
            };
            return this.http
                .post<any>(openviduServerUrl + '/openvidu/api/sessions/' + sessionId + '/connection', body, options)
                .pipe(
                    catchError((error) => {
                        reject(error);
                        return observableThrowError(error);
                    }),
                )
                .subscribe((response) => {
                    console.log(response);
                    resolve(response.token);
                });
        });
    }

    public getRandomAvatar(): string {
        return 'https://www.searchpng.com/wp-content/uploads/2019/02/User-Icon-PNG.png';
    }

    public checkAndroidPermissions(): Promise<void> {
        console.log('Requesting Android Permissions');
        return new Promise((resolve, reject) => {
            this.androidPermissions.requestPermissions(this.ANDROID_PERMISSIONS)
                .then(() => {
                  const promisesArray: Promise<any> [] = [];
                  this.ANDROID_PERMISSIONS.forEach((permission) => {
                    console.log('Checking ', permission);
                    promisesArray.push(this.androidPermissions.checkPermission(permission));
                  });
                  Promise.all(promisesArray).then((responses) => {
                    let allHasPermissions = true;
                    responses.forEach((response, i) => {
                        allHasPermissions =  response.hasPermission;
                        if (!allHasPermissions) {
                          reject(
                            new Error(
                              'Permissions denied: ' + this.ANDROID_PERMISSIONS[i]
                            ));
                        }
                    });
                    resolve();
                  }).catch((err) => { console.log(err); });
                })
                .catch((err) => console.error('Error requesting permissions: ', err));
        });
    }
}
