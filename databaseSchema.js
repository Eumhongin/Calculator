let db = {
    2019: {
        10: {

            DirectPayment: {
                LiteralDate: {
                    SpentCell: {

                    }
                },
                TotalDirectFromPaymenyDay: 0
            },

            SpreadOutPayment: {
                LiteralDate: {
                    0: {
                        SpentYear: 2019,
                        SpentMonth: 7,
                        SpentDay: 29,
                        SpentMoneyPlace: '홈플러스 내당점',
                        SpentMoney: 51600,
                        SpentMoneyDescription: '홈플러스에서 장을 보았습니다.',
                        SpreadOut: 0,
                        SpreadOutMoney: 17200
                    },
                    1: {
                        SpentYear: 2019,
                        SpentMonth: 6,
                        SpentDay: 12,
                        SpentMoneyPlace: '샤오미 공기청정기',
                        SpentMoney: 150000,
                        SpentMoneyDescription: '샤오미 공기청정기',
                        SpreadOut: 2,
                        SpreadOutMoney: 30000
                    }
                },
                TotalSpreadFromPaymenyDay: 47200

            }
        },
        9: {

            DirectPayment: {
                LiteralDate: {
                    SpentCell: {

                    }
                },
                TotalDirectFromPaymenyDay: 0
            },

            SpreadOutPayment: {
                LiteralDate: {
                    0: {
                        SpentYear: 2019,
                        SpentMonth: 7,
                        SpentDay: 29,
                        SpentMoneyPlace: '홈플러스 내당점',
                        SpentMoney: 51600,
                        SpentMoneyDescription: '홈플러스에서 장을 보았습니다.',
                        SpreadOut: 1,
                        SpreadOutMoney: 17200
                    },
                    1: {
                        SpentYear: 2019,
                        SpentMonth: 6,
                        SpentDay: 12,
                        SpentMoneyPlace: '샤오미 공기청정기',
                        SpentMoney: 150000,
                        SpentMoneyDescription: '샤오미 공기청정기',
                        SpreadOut: 3,
                       SpreadOutMoney: 30000
                    },
                    2: {
                        SpentYear: 2019,
                        SpentMonth: 6,
                        SpentDay: 22,
                        SpentMoneyPlace: '모니터',
                        SpentMoney: 150000,
                        SpentMoneyDescription: '삼성 모니터',
                        SpreadOut: 1,
                        SpreadOutMoney: 50000
                    },
                },
                TotalSpreadFromPaymenyDay: 97200


            }
        },

        8: {
            //일시불
            DirectPayment: {
                //일시불은 한번에 계산해서 넘기면된다.
                LiteralDate: {
                    0: {
                        SpentYear: 2019,
                        SpentMonth: 8,
                        SpentDay: 22,
                        SpentMoneyPlace: 'GS편의점',
                        SpentMoney: 3200,
                        SpentMoneyDescription: '편의점에서 핫도그를 사먹었습니다.'
                    },
                    1: {
                        SpentYear: 2019,
                        SpentMonth: 8,
                        SpentDay: 24,
                        SpentMoneyPlace: '대백마트',
                        SpentMoney: 32000,
                        SpentMoneyDescription: '대백마트에서 장을 보았습니다.'
                    },
                    2: {
                        SpentYear: 2019,
                        SpentMonth: 8,
                        SpentDay: 27,
                        SpentMoneyPlace: '이마트',
                        SpentMoney: 13200,
                        SpentMoneyDescription: '이마트에서 장을 보았습니다'
                    }
                },
                TotalDirectFromPaymenyDay: 48400
                //결제일로 부터 금액.
            },
            //할부
            SpreadOutPayment: {
                LiteralDate: {
                    0: {
                        SpentYear: 2019,
                        SpentMonth: 7,
                        SpentDay: 29,
                        SpentMoneyPlace: '홈플러스 내당점',
                        SpentMoney: 51600,
                        SpentMoneyDescription: '홈플러스에서 장을 보았습니다.',
                        SpreadOut: 2,
                        SpreadOutMoney: 17200
                    },
                    1: {
                        SpentYear: 2019,
                        SpentMonth: 6,
                        SpentDay: 12,
                        SpentMoneyPlace: '샤오미 공기청정기',
                        SpentMoney: 150000,
                        SpentMoneyDescription: '샤오미 공기청정기',
                        SpreadOut: 4,
                        SpreadOutMoney: 30000
                    },
                     2: {
                         SpentYear: 2019,
                         SpentMonth: 6,
                         SpentDay: 22,
                         SpentMoneyPlace: '모니터',
                         SpentMoney: 150000,
                         SpentMoneyDescription: '삼성 모니터',
                         SpreadOut: 2,
                         SpreadOutMoney: 50000
                     },
                },
                TotalSpreadFromPaymenyDay: 97200
                //넘어온 할부만 다 더하면된다. 결제일 신경안써도됨. 결제일만 조심해서 다루자. 결제일 이후에 벌어지는건 그다음달로 넘겨야되니까.. 잘 관리해야한다.

            }

        }
    }
}

//2019/4/31