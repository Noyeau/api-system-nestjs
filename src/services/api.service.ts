import { Injectable } from '@nestjs/common';
import { Api } from 'src/entities/api.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApiService {
    constructor(
        @InjectRepository(Api) private apiRepository: Repository<Api>,

    ) { }


    public async getAll(user, apiNoyeau): Promise<Api[]> {
        console.log(1)
        return new Promise<Api[]>((resolve, reject) => {
            if(apiNoyeau){
                this.apiRepository.find().then(apiList => {
                    if (!apiList) {
                        console.log("erreur pas d'apis")
                        reject({ msg: 'erreur getapi()' })
                        return
                    } else {
                        console.log("ok list api")
                        resolve(apiList)
                        return
                    }
                })
            }
            else if (user) {
                console.log("user")

                if (user['noyeauProfile'] && user['noyeauProfile'].role.includes('admin')) {
                    console.log("user-admin")

                    this.apiRepository.find().then(apiList => {
                        if (!apiList) {
                            console.log("erreur pas d'apis")
                            reject({ msg: 'erreur getapi()' })
                            return
                        } else {
                            console.log("ok list api")
                            resolve(apiList)
                            return
                        }
                    })
                }
                else {
                    console.log("user-user")
                    this.apiRepository.find({
                        where: {
                            // open: true,
                            activated: true,
                           
                        },
                        select: [
                            'id',
                            'label',
                            'code',
                            'description',
                            'open',
                            'role',
                            'repository'
                        ]
                    }).then(apiList => {
                        if (!apiList) {
                            console.log("erreur pas d'apis")
                            reject({ msg: 'erreur getapi()' })
                            return;
                        } else {
                            console.log("ok list api")
                            resolve(apiList)
                            return;
                        }
                    })
                }
            } else {
                console.log("no-user")

                this.apiRepository.find({
                    where: {
                        // open: true,
                        activated: true,
                        
                    },
                    select: [
                        'id',
                        'label',
                        'code',
                        'description',
                        'open',
                        'role',
                        'repository'
                    ]
                }).then(apiList => {
                    if (!apiList) {
                        console.log("erreur pas d'apis")
                        reject({ msg: 'erreur getapi()' })
                        return;
                    } else {
                        console.log("ok list api")
                        // apiList[0].label = "NOYEAU API User"
                        // apiList[0].save();
                        
                        resolve(apiList)
                        return;
                    }
                })
            }
        })
    }


    public async initApiInfo(code) {
        return new Promise<any>((resolve, reject) => {
            this.apiRepository.findOne({
                where: {
                    code: code,
                    activated: true
                }, select: [
                    'id',
                    'label',
                    'code',
                    'description',
                    'open',
                    'serveur',
                    'port',
                    'data',
                    'role',
                    'repository'
                ]
            }).then(api => {
                if (!api) {
                    reject('erreur getapi()')
                } else {
                    this.apiRepository.find().then(list => {
                        resolve({ api: api, list: list })
                    })
                }
            })
        })
    }

}
