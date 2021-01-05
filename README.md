# MAP API Geocoding
## Hướng dẫn
### Cài đặt
Cài đặt gói
```
mvn install
```
Compile file .jar
```
mvn package
```
File `photon-*.jar` sẽ tìm thấy ở `./target/`
### Chạy từ file jar
Import dữ liệu từ _nominatim_
```
java -jar {jar file} -nominatim-import -host {host} -port {port} -database {database name} -user {user} -password {password} -languages {languages}
```
Chạy service
```
java -jar {jar file}
```
### Chạy từ source code
Import dữ liệu từ _nominatim_
```
mvn exec:java -Dexec.mainClass="de.komoot.photon.App" -Dexec.args="{arg tương tự trên}"
```
Chạy service
```
mvn exec:java -Dexec.mainClass="de.komoot.photon.App"
```
## Môi trường
### Nominatim Server
IP: 192.168.1.102  
user: root  
pwd: 1  
### Nominatim Database:
IP: 192.168.1.102  
PORT: 5432  
USER: postgres  
PWD: admin_123  
dbname: nominatim  
### GIS Database: 
IP: 192.168.1.101  
PORT: 5432  
USER: postgres  
PWD: admin_123  
dbname: vntile  