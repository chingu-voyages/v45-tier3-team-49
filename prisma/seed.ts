import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

const user1Password = bcrypt.hashSync('123', 10)
const user2Password = bcrypt.hashSync('345', 10)

async function main() {
  const insurance1 = await prisma.insurancePolicies.upsert({
    where: { policyNum: '123abc' },
    update: {},
    create: {
      policyNum: '123abc',
      contact: '123 HotRod Drive',
      emergencyDetails: 'call Holly at 123-456-9999 for after hours pickup'
    }
  })
  const insurance2 = await prisma.insurancePolicies.upsert({
    where: { policyNum: '345abc' },
    update: {},
    create: {
      policyNum: '345abc',
      contact: '123 HotRod Drive',
      emergencyDetails: 'call vet Bill at 111-111-1111 for after hours work'
    }
  })

  const vet1 = await prisma.vets.upsert({
    where: { vetName: 'Cleveland Vet Clinic' },
    update: {},
    create: {
      vetName: 'Cleveland Vet Clinic',
      address: '123 Cleveland Ave',
      appointments: 'Once every 4 months',
      specialNotes: 'Wear muzzle at this vet'
    }
  })

  const vet2 = await prisma.vets.upsert({
    where: { vetName: 'Cat Clinic Sicily' },
    update: {},
    create: {
      vetName: 'Cat Clinic Sicily',
      address: '123 Sicily Ave',
      appointments: 'Once a year',
      specialNotes: 'Always bring poop bags'
    }
  })

  const user1 = await prisma.users.upsert({
    where: { username: 'test1' },
    update: { password: user1Password },
    create: {
      username: 'test1',
      email: 'test1@test.com',
      password: user1Password,
      pet: {
        create: {
          petName: 'sally',
          petType: 'dog',
          DOB: 'July 1st, 2020',
          gender: 'male',
          diet: {
            create: {
              foodType: 'organic bison kibble',
              freqPerDay: '1 per day',
              freqPerWeek: '7 times per week',
              supplements: 'Bone broth every night'
            }
          },
          physicalChar: {
            create: {
              color: 'brown',
              weight: 40,
              height: 30,
              uniqueChar: 'Large white spot near base of tail'
            }
          },
          grooming: {
            create: {
              skinCondition: 'great',
              coatType: 'long',
              schedule: 'brush daily'
            }
          },
          healthInfo: {
            create: {
              allergies: 'peanuts, oranges',
              medication: 'none',
              chronicIssues: 'left hip issue',
              exerciseRoutine: 'daily walks, weekly runs',
              routineCheckup: faker.date.recent(),
              vaccinations:
                'All vaccinations up to date, Rabies, bortodella etc'
            }
          },
          note: {
            create: [
              {
                note: 'make sure to pet the left ear daily'
              },
              {
                note: 'Please take care when walking, sally likes to jump on people'
              }
            ]
          },
          PetInsuranceVet: {
            create: {
              vetId: vet1.id,
              insuranceId: insurance1.id
            }
          }
        }
      },
      userInsuranceVet: {
        create: {
          vetId: vet1.id,
          insuranceId: insurance1.id
        }
      }
    }
  })

  const user2 = await prisma.users.upsert({
    where: { username: 'test2' },
    update: { password: user2Password },
    create: {
      username: 'test2',
      email: 'test2@test.com',
      password: user2Password,
      pet: {
        create: {
          petName: 'billy',
          petType: 'cat',
          DOB: 'Dec 31st, 2021',
          gender: 'female',
          diet: {
            create: {
              foodType: 'organic seafood kibble',
              freqPerDay: 'twice per day',
              freqPerWeek: '7 times per week',
              supplements: 'Fish scales daily'
            }
          },
          physicalChar: {
            create: {
              color: 'black',
              weight: 45,
              height: 20,
              uniqueChar: 'one purple paw'
            }
          },
          grooming: {
            create: {
              skinCondition: 'sensitive',
              coatType: 'thick and curly',
              schedule: 'brush daily'
            }
          },
          healthInfo: {
            create: {
              allergies: 'grapes and pistachios',
              medication: 'Daily seizure medicine, 2 pills',
              chronicIssues: 'left hip issue',
              exerciseRoutine: 'daily walks, weekly runs',
              vaccinations: 'Need to update Rabies soon, all others are done',
              routineCheckup: faker.date.recent()
            }
          },
          note: {
            create: {
              note: 'make sure to pet the left ear daily'
            }
          },
          PetInsuranceVet: {
            create: {
              vetId: vet2.id,
              insuranceId: insurance2.id
            }
          }
        }
      },
      userInsuranceVet: {
        create: {
          vetId: vet2.id,
          insuranceId: insurance2.id
        }
      }
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
