//
//  HomeView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/14.
//

import SwiftUI
import SwiftyJSON

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
                print(json)
            case let .failure(error):
                print(error)
            }
        }
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
