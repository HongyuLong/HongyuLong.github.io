//
//  HomeView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/14.
//

import SwiftUI
import SwiftyJSON
import Kingfisher



struct HomeView: View {
    var body: some View {
        Button(action: {
            self.startLoad()
        }) {
            /*@START_MENU_TOKEN@*/Text("Button")/*@END_MENU_TOKEN@*/
        }
        
    }
    
    func startLoad() {
        NetworkManager.shared.requestGet(path: "/home/tv") { result in
            switch result {
            case let .success(data):
                let json = try! JSON(data: data)
                parseDynamicCards(results: json["now_playing"])
            case let .failure(error):
                print(error)
            }
        }
    }
    
    func parseDynamicCards(results: JSON) {
        var cards:[DynamicCard] = []
        if let cardArr = results.to(type: DynamicCard.self) {
            cards = cardArr as! [DynamicCard]
        }
        print(cards)
    }
}

struct HomeView_Previews: PreviewProvider {
    // variables
    static var previews: some View {
        HomeView()
    }
}
