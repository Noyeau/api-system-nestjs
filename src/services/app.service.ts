import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { App } from 'src/entities/app.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(App) private appRepository: Repository<App>,

) { }

  public async initAppInfo(code) {
    console.log(code)
    return new Promise<any>((resolve, reject) => {
        this.appRepository.find({
            where: {
                code: code,
                activated: true
            }, select: [
                'id',
                'label',
                'code',
                'description',
                'activated',
                'open',
                'url',
                'data',
                'role',
                'repository'
            ]
        }).then(app => {
            if (!app) {
                reject({msg : "Erreur sur le code d'application"})
            } else {
                this.appRepository.find().then(list => {
                    resolve({ app: app, list: list })
                })
            }
        })
    })
}

public async getAll(user, admin): Promise<App[]> {
  console.log(1)
  return new Promise<App[]>((resolve, reject) => {
      if (admin) {
          this.appRepository.find().then(appList => {
              if (!appList) {
                  console.log("erreur pas d'apps")
                  reject({ msg: 'erreur getapp()' })
                  return
              } else {
                  console.log("ok list app")
                  resolve(appList)
                  return
              }
          })
      }
      else if (user) {
          console.log("user")

          if (user['noyeauProfile'] && user['noyeauProfile'].role.includes('admin')) {
              console.log("user-admin")

              this.appRepository.find().then(appList => {
                  if (!appList) {
                      console.log("erreur pas d'apps")
                      reject({ msg: 'erreur getapp()' })
                      return
                  } else {
                      console.log("ok list app")
                      resolve(appList)
                      return
                  }
              })
          }
          else {
              console.log("user-user")
              this.appRepository.find({
                  where: {
                      activated: true,
                  },
                  select: [
                      'label',
                      'code',
                      'description',
                      'open',
                      'url',
                      'role',
                      'repository'
                  ]
              }).then(appList => {
                  if (!appList) {
                      console.log("erreur pas d'apps")
                      reject({ msg: 'erreur getapp()' })
                      return;
                  } else {
                      console.log("ok list app")
                      resolve(appList)
                      return;
                  }
              })
          }
      } else {
          console.log("no-user")

          this.appRepository.find({
              where: {
                  open: true,
                  activated: true,

              },
              select: [
                  'label',
                  'code',
                  'description',
                  'open',
                  'url',
                  'role',
                  'repository'
              ]
          }).then(appList => {
              if (!appList) {
                  console.log("erreur pas d'apps")
                  reject({ msg: 'erreur getapp()' })
                  return;
              } else {
                  console.log("ok list app")
                  resolve(appList)
                  return;
              }
          })
      }
  })
}


}
